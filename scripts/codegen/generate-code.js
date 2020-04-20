const inquirer = require('inquirer');
const fs = require('fs');
const Rx = require('rxjs');
const ncp = require('ncp').ncp;
const replace = require('replace-in-file');
const rimraf = require('rimraf');
const colors = require('colors');

/**
 * This class manages the CLI interface for generating code for a new component.
 */
class ComponentGenerator {

    constructor () {
        this.bindCallbacks();
        this.setup();
        this.init();
    }

    /**
     * Bind these handlers to the class instance
     */
    bindCallbacks () {
        this.onEachAnswer = this.onEachAnswer.bind(this);
        this.onError = this.onError.bind(this);
        this.onComplete = this.onComplete.bind(this);
        this.renameBoilerplateFiles = this.renameBoilerplateFiles.bind(this);
        this.validateComponentNameStep = this.validateComponentNameStep.bind(this);
    }

    /**
     * Setup some instance variables that will be needed throughout the process.
     */
    setup () {
        /**
         * An array of errors that we've encountered along the way
         * @type {*[]}
         */
        this.errors = [];
        /**
         * A list of options to help build directory/file naming and text replacement
         * @type {{path: null, libDirectory: string, name: null, type: null, directory: null}}
         */
        this.options = {
            name: null,
            type: null,
            path: null,
            directory: null,
            libDirectory: './src/lib/'
        };
        /**
         * The files that we need to copy have the following suffixes. This allows us to loop
         * through the list of files needed.
         *
         * @type {string[]}
         */
        this.suffixes = [
            '.tsx', // for the main typescript component file
            '.test.tsx',
            '.styles.scss',
            '.stories.tsx'
        ];
        /**
         * This is the inquirer step for the path fuzzy search
         *
         * @type {{excludeFilter: (function(*): boolean), itemType: string, depthLimit: number,
         *     name: string, suggestOnly: boolean, rootPath: string, type: string, message: string,
         *     excludePath: (function(*): *|boolean)}}
         */
        this.selectDirectoryStep = {
            type: 'fuzzypath',
            name: 'componentPath',
            excludePath: nodePath => nodePath.startsWith('node_modules'),
            excludeFilter: nodePath => nodePath == '.',
            itemType: 'directory',
            rootPath: 'src/lib/components',
            message: 'Select a target directory for your component:',
            suggestOnly: false,
            depthLimit: 5
        };
    }

    /**
     * Kick of the CLI prompts.
     */
    init () {
        this.prompts = new Rx.Subject();
        inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));
        inquirer.prompt(this.prompts).ui.process.subscribe(this.onEachAnswer, this.onError, this.onComplete);
        this.prompts.next({
           name   : 'componentType',
           type   : 'list',
           message: 'What type of component would you like to create?',
           choices: ['A functional component', 'A class-based component']
        });
    }

    /**
     * The handler for each time the user answers one of the step questions.
     * @param response
     */
    onEachAnswer (response) {
        switch (response.name) {
            case 'componentType':
                this.handleComponentTypeStep(response);
                break;
            case 'componentName':
                this.handleComponentNameStep(response);
                break;
            case 'componentPath':
                this.handleComponentPathStep(response);
                break;
        }
    }

    /**
     * Handler for when we run into major errors.
     *
     * @param error
     */
    onError (error) {
        console.log(error);
    }

    /**
     * Once the user has answered all of the questions, we kick off creating the new component
     * within the file system.
     */
    onComplete () {
        this.copyBoilerplateDirectory();
    }

    /**
     * When the user chooses the type of component this will be, we save that answer and kick off
     * the next step.
     *
     * @param response
     */
    handleComponentTypeStep (response) {
        this.options.type = this.getComponentType(response.answer);
        this.prompts.next({
            name    : 'componentName',
            type    : 'input',
            message : 'What would you like to name your component [Please use PascalCase]?',
            validate: this.validateComponentNameStep
        });
    }

    /**
     * When the user enters the name for the new component, and that name is validated, then we
     * save that value, create the path to the component directory, and kick off the next step.
     *
     * @param response
     */
    handleComponentNameStep (response) {
        this.options.name = response.answer;
        this.options.path = this.getComponentPath();
        this.prompts.next(this.selectDirectoryStep);
    }

    /**
     * When a user has chosen a path in which to create the component, we check to make sure that
     * directory doesn't already exist. If it does, we display an error and kick off that same step
     * again, allowing the user to choose a different directory. If it doesn't exist, we save the
     * path and kick off actually creating the component in the file system.
     *
     * @param response
     * @returns {boolean}
     */
    handleComponentPathStep (response) {
        if (fs.existsSync(`${response.answer}/${this.options.directory}`)) {
            console.log(`\nThe directory (${response.answer}/${this.options.directory}) already exists. Please choose another path or press <Ctrl>C to quit.\n`.white.bgRed);
            this.prompts.next(this.selectDirectoryStep);
            return;
        }
        this.options.path = `${response.answer}/${this.options.directory}`;
        this.prompts.complete();
    }

    /**
     * Validate that the component name is PascalCase.
     *
     * @param input
     * @returns {string|boolean}
     */
    validateComponentNameStep (input) {
        const pascalRegex = new RegExp(/^[A-Z]([A-Z0-9]*[a-z][a-z0-9]*[A-Z]|[a-z0-9]*[A-Z][A-Z0-9]*[a-z])[A-Za-z0-9]*/);
        if (!pascalRegex.test(input)) {
            return 'Component name must be PascalCase.';
        }
        return true;
    }

    /**
     * Get the internal type of the component.
     *
     * @param answer
     * @returns {string}
     */
    getComponentType (answer) {
        if (answer === 'A class-based component') {
            return 'classbased';
        }
        return 'functional';
    }

    /**
     * Get the path to the component, including the component directory.
     *
     * @returns {string}
     */
    getComponentPath () {
        this.options.directory = this.convertToSnakeCase(this.options.name);
        return `${this.options.libDirectory}${this.options.directory}`;
    }

    /**
     * Converts a string from PascalCase to snake-case.
     *
     * @param str
     * @returns {string}
     */
    convertToSnakeCase (str) {
        return str.split(/(?=[A-Z])/).join('-').toLowerCase();
    }

    /**
     * Copy the boilerplate directory to the new component directory.
     */
    copyBoilerplateDirectory () {
        const source = './scripts/codegen/boilerplate';
        const destination = `${this.options.path}`;
        ncp(source, destination, this.renameBoilerplateFiles);
    }

    /**
     * Renames the boilerplate files to the component specific file names.
     *
     * @param err
     */
    renameBoilerplateFiles (err) {
        if (err) {
            return console.log(err);
        }
        this.suffixes.forEach((suffix) => {
            const componentType = (suffix === '.tsx') ? `-${this.options.type}` : '';
            const otherComponentType = this.options.type === 'functional' ? '-classbased': '-functional';
            const oldPath = `${this.options.path}/boilerplate${componentType}${suffix}`;
            const deletePath = `${this.options.path}/boilerplate${otherComponentType}.tsx`;
            const newPath = `${this.options.path}/${this.options.directory}${suffix}`;
            try {
                fs.renameSync(oldPath, newPath);
            } catch (e) {
                this.errors.push(e);
                console.log(e);
            }
            if (fs.existsSync(deletePath)) {
                fs.unlinkSync(deletePath);
            }
        });
        if (!this.hasErrors()) {
            this.replaceBoilerplateWithinFiles();
        } else {
            this.cleanUp();
        }
    }

    /**
     * Does a search/replace of boilerplate text within the newly created component files to the
     * component specific text.
     */
    replaceBoilerplateWithinFiles () {
        this.suffixes.forEach((suffix) => {
            const file = `${this.options.path}/${this.options.directory}${suffix}`;
            const pascalOptions = {
                files: file,
                from: /Boilerplate/g,
                to: this.options.name
            };
            const snakeCaseOptions = {
                files: `${this.options.path}/${this.options.directory}${suffix}`,
                from: /boilerplate/g,
                to: this.options.directory
            };
            try {
                replace.sync(pascalOptions);
                replace.sync(snakeCaseOptions);
            }
            catch (error) {
                this.errors.push(error);
                console.log('Error occurred:', error);
            }
        });
        if (!this.hasErrors()) {
            this.addExportToIndexFile();
            console.info(`\nYour component has been created at ${this.options.path}\n`.black.bgGreen);
        } else {
            this.cleanUp();
        }
    }

    /**
     * Returns false if there are no errors collected yet.
     *
     * @returns {number}
     */
    hasErrors () {
        return this.errors.length;
    }

    /**
     * If we run into a fatal error, we want to attempt to delete the component directory if we
     * have already created it.
     */
    cleanUp () {
        if (fs.existsSync(this.options.path)) {
            rimraf.sync(this.options.path);
        }
        console.log('We could not create your component. Please see above for error.'.white.bgRed)
    }

    /**
     * Adds this component as a named export in the ./src/lib/index.js file
     */
    addExportToIndexFile () {
        const indexFile = './src/lib/index.js';
        let contents = fs.readFileSync(indexFile, 'utf8');
        if (!contents.endsWith('\n')) {
            contents = `${contents}\n`;
        }
        if (
            !contents.includes(`{ ${this.options.name} }`) &&
            !contents.includes(`{${this.options.name}}`)
        ) {
            const path = this.options.path.replace('src/lib', '.');
            const content =`export { ${this.options.name} } from "${path}/${this.options.directory}";\n`;
            const stream = fs.createWriteStream(indexFile, {flags:'a'});
            stream.write(content);
            stream.end();
        }
    }
}

new ComponentGenerator();

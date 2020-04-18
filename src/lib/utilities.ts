import moment from 'moment-timezone';

/**
 * Removes properties from an object.
 *
 * @see https://github.com/benjycui/omit.js
 *
 * @param obj
 * @param fields
 */
export const omitProps = (obj:object, fields: Array<string>) => {
    const shallowCopy: any = {
        ...obj,
    };
    for (let i = 0; i < fields.length; i++) {
        const key = fields[i];
        delete shallowCopy[key];
    }
    return shallowCopy;
};


/**
 * Given a unix timestamp and a timezone, returns a moment object that
 * we can format for display.
 *
 * @category Utilities
 *
 * @param timestamp
 * @param userTimezone
 * @returns {*}
 */
export const getLocalizedTimeFromTimestamp = (timestamp: number, userTimezone: string) =>
    moment.unix(timestamp).tz(userTimezone);

/**
 * Take a color in hex format (i.e. #F06D06, with or without hash) and
 * lighten or darken it with a value.
 *
 * Lighten: const newColor = lightenDarkenColor('#F06D06', 20);
 * Darken:  const newColor = lightenDarkenColor('#F06D06', -20);
 *
 * @category Utilities
 *
 * @param {string} col
 * @param {number} amt
 * @returns {string}
 */
export const lightenDarkenColor = (col: string, amt: number) => {
    var usePound = false;

    if (col[0] === '#') {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255) {
        r = 255;
    } else if (r < 0) {
        r = 0;
    }

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) {
        b = 255;
    } else if (b < 0) {
        b = 0;
    }

    var g = (num & 0x0000FF) + amt;

    if (g > 255) {
        g = 255;
    } else if (g < 0) {
        g = 0;
    }

    return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
};

/**
 * By default, we use Eastern time as the timezone to display. However,
 * we'll override this with whatever the user's timezone is.
 *
 * It's possible that not every user's timezone is valid, so if you're
 * debugging broken date display issues, this is the value to look at.
 *
 * @category Utilities
 *
 */
export const getUserTimezone = () => {
    let userTimezone = 'America/New_York';
    // @ts-ignore
    if (window.PublisherConfig && window.PublisherConfig.user && window.PublisherConfig.user.timezone) {
        // @ts-ignore
        userTimezone = window.PublisherConfig.user.timezone;
    }
    return userTimezone;
};

/**
 * A given item in the grid can be a an empty piece of
 * padding, a post, or a timeslot.
 *
 * @category Utilities
 *
 * @type {{
 *   PADDING : string,
 *   POST    : string,
 *   TIMESLOT: string
 * }}
 */
export const VISUAL_PLANNING_GRID_ITEM_TYPES = {
    PADDING : 'PADDING',
    POST    : 'POST',
    TIMESLOT: 'TIMESLOT'
};

/**
 * Posts can be drafts, scheduled, or already published.
 *
 * @category Utilities
 *
 * @type {{PUBLISHED: string, DRAFT: string, SCHEDULED: string}}
 */
export const VISUAL_PLANNING_POST_TYPES = {
    DRAFT    : 'DRAFT',
    SCHEDULED: 'SCHEDULED',
    PUBLISHED: 'PUBLISHED'
};

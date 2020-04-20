import React, { useEffect, useState, ChangeEventHandler } from 'react';
import { Table, Input, Spin } from 'antd';
import { debounce } from 'debounce';
import { withKnobs } from '@storybook/addon-knobs';

import 'antd/es/table/style/index.css';
import 'antd/es/input/style/index.css';
import 'antd/es/spin/style/index.css';

export default {
    title: 'Table',
    component: Table,
    decorators: [withKnobs]
};

export const DefaultUse = () => {
    // Use State Hooks
    const [loading, setLoading] = useState(false);
    const [hashtag, setHashtag] = useState("oklahoma");
    const [data, setData] = useState({ count: 0, edges: [] } as InstagramMediaCollection);

    // Hook for loading data
    useEffect(() => {
        // Function to fetch data
        const fetchData = async () => {
            try {
                console.info(`Firing for user ${hashtag}`)
                const response = await fetch(`https://www.instagram.com/explore/tags/${hashtag}/?__a=1`);
                const json: InstagramHashtagResponse = await response.json();
                setData(json.graphql.hashtag.edge_hashtag_to_media);
            }
            catch (e) {
                console.info(`Error fetching Instagram GraphQL for ${hashtag}: ${e}`);
                setData({ count: 0, edges: [] });
            }
            setLoading(false);
        };

        setLoading(true);
        fetchData();
    }, [hashtag]);

    // Maps InstagramMedia[] to DataRecord[] (from raw data to records we need for the Table component)
    const mapRecords: (edges: InstagramMedia[]) => DataRecord[] = (edges) => {
        return edges.map((edge: InstagramMedia) => {
            return {
                thumbnail: edge.node.thumbnail_resources.length > 0 ? edge.node.thumbnail_resources[0].src : "",
                caption: edge.node.edge_media_to_caption.edges.length > 0 ? edge.node.edge_media_to_caption.edges[0].node.text : "",
                likes: edge.node.edge_liked_by.count,
                time: edge.node.taken_at_timestamp,
            }
        });
    }

    // Debounced On Input Change to handle user input
    const debounced = debounce((hashtag: string) => setHashtag(hashtag), 500);
    const onInputChange: ChangeEventHandler<HTMLInputElement> = event => {
        debounced.clear();
        debounced(event.target.value);
    }

    // Render
    return (
        <div>
            <Input
                size="middle"
                placeholder="Hashtag"
                style={{ width: 250 }}
                defaultValue={hashtag}
                onChange={onInputChange}
            />
            <Spin style={{ visibility: loading ? "visible" : "hidden" }} />
            <Table columns={columns} dataSource={mapRecords(data.edges)} pagination={{ pageSize: 10 }} scroll={{ y: "calc(100vh - 140px)" }} />
        </div>
    );
};

const columns = [
    {
        title: 'Thumbnail',
        dataIndex: 'thumbnail',
        key: 'thumbnail',
        render: (text: string) => <img alt="" src={text} />,
    },
    {
        title: 'Caption',
        dataIndex: 'caption',
        key: 'caption',
    },
    {
        title: 'Likes',
        dataIndex: 'likes',
        key: 'likes',
    },
    {
        title: 'Time',
        key: 'time',
        dataIndex: 'time',
    },
]

interface DataRecord {
    thumbnail: string,
    caption: string,
    likes: number,
    time: number
}

interface InstagramHashtagResponse {
    graphql: {
        hashtag: {
            edge_hashtag_to_media: InstagramMediaCollection
        }
    }
}

interface InstagramMediaCollection {
    count: number,
    edges: InstagramMedia[]
}

interface InstagramMedia {
    node: {
        __typename: string,
        id: string,
        edge_media_to_caption: {
            edges: [{
                node: {
                    text: string
                }
            }]
        },
        shortcode: string,
        edge_media_to_comment: {
            count: number
        },
        comments_disabled: boolean,
        taken_at_timestamp: number,
        dimensions: {
            height: number,
            width: number
        },
        display_url: string,
        edge_liked_by: {
            count: number
        },
        edge_media_preview_like: {
            count: number
        },
        location: {
            id: string,
            has_public_page: boolean,
            name: string,
            slug: string
        },
        gating_info?: string,
        fact_check_overall_rating?: number,
        fact_check_information: string,
        media_preview: string,
        owner: {
            id: string,
            username: string
        },
        thumbnail_src: string,
        thumbnail_resources: [{
            src: string,
            config_width: number,
            config_height: number
        }],
        is_video: boolean,
        accessibility_caption: string
    }
}

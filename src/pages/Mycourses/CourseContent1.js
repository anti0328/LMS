import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { List, Divider, Collapse } from 'antd'

function CourseContent() {
    let [sourceData, setSourceData] = useState([])
    const { course_id } = useParams(); // Correct usage
    let params = {
        course_id: course_id, // Assuming 'id' is already defined in your scope
    };
    useEffect(() => {
        axios.get("http://localhost:4000/canvas/getcontentbyid", { params })
            .then((rlt) => {
                console.log(rlt.data)
                setSourceData(rlt.data);
            }).catch((error) => {
                console.error("There was an error!", error);
            });
    }, [])

    return (
        <>
            <Divider orientation="left">Small Size</Divider>
            <List
                size="small"
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={sourceData}
                renderItem={(item) => <List.Item>{item.name}</List.Item>}
            />
        </>
    );
}

export default CourseContent;
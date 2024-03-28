import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { List, Card, Collapse, Typography, Spin } from "antd";
import { SERVER_URL } from '../../config'

const CourseContent = () => {

    const [loading, setLoading] = useState(true)
    const [collapseData, setCollapseData] = useState([])
    const { course_id } = useParams(); // Correct usage
    const navigate = useNavigate();

    let params = {
        course_id: course_id, // Assuming 'id' is already defined in your scope
    };

    const goLectureRoom = (module_id, page_url, name) => {
        navigate(`lectureRoom`, { state: { course_id: course_id, name: name, page_url: page_url } });
    }
    useEffect(() => {
        setLoading(true)
        axios.get(`${SERVER_URL}/canvas/getcontentbyid`, { params })
            .then((rlt) => {
                console.log(rlt.data)
                const data = rlt.data.map((item, index) => ({
                    key: index,
                    label: item.name,
                    children: (
                        <div>
                            <List dataSource={item.lessons}
                                renderItem={(node) => (
                                    <List.Item>
                                        <Typography mark style={{ cursor: "pointer" }} onClick={() => goLectureRoom(node.module_id, node.page_url, node.name)}>{node.title}</Typography>
                                    </List.Item>
                                )}
                            />

                        </div>
                    )
                }))
                setCollapseData(data);
                setLoading(false)
            }).catch((error) => {
                console.error("There was an error!", error);
            });
    }, [])

    return (
        <>
            <Card style={{ minHeight: "800px" }}>
                <Typography.Title>Contents</Typography.Title>
                {loading ? <Spin style={{ position: "absolute", left: "50%", top: "50%", zIndex: 999 }} /> : <Collapse defaultActiveKey="0" items={collapseData} />}
            </Card>
        </>
    );
};

export default CourseContent;

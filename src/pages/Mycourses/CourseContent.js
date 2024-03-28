import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Space, Table, Row, Card, Col, Tag, Input, Button, Collapse, Typography } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import attendanceImg from "../../assets/svg/attendance.svg";
import journalImg from "../../assets/svg/journal.svg";
import standardsImg from "../../assets/svg/standards.svg";
import Paragraph from "antd/es/skeleton/Paragraph";

const data = [
    {
        key: "1",
        no: "1",
        course: "CC27 - 1st Grade Language Arts Semester 1",
        timeSpend: "",
        teacher: "Florence Samuels",
        enrolledDate: "24 Feb 2023",
        startDate: "24 Feb 2023",
        status: (
            <Tag icon={<CheckCircleOutlined />} color="success">
                {" "}
                Active
            </Tag>
        ),
        other: (
            <>
                <Row>
                    <a>
                        <Col
                            style={{
                                alignItems: "center",
                                display: "flex",
                                flexDirection: "row",
                            }}>
                            <img
                                src={journalImg}
                                style={{ width: "16px", height: "16px", marginRight: "5px" }}
                            />
                            Journal
                        </Col>
                    </a>
                </Row>
                <Row>
                    <a>
                        <Col
                            style={{
                                alignItems: "center",
                                display: "flex",
                                flexDirection: "row",
                                marginTop: "5px",
                            }}>
                            <img
                                src={standardsImg}
                                style={{ width: "16px", height: "16px", marginRight: "5px" }}
                            />
                            View Standards
                        </Col>
                    </a>
                </Row>
            </>
        ),
    },
    {
        key: "2",
        no: "2",
        course: "CC27 - 1st Grade Language Arts Semester 1",
        timeSpend: "",
        teacher: "Florence Samuels",
        enrolledDate: "24 Feb 2023",
        startDate: "24 Feb 2023",
        status: (
            <Tag icon={<CheckCircleOutlined />} color="success">
                Active
            </Tag>
        ),
    },
    {
        key: "3",
        no: "3",
        course: "CC27 - 1st Grade Language Arts Semester 1",
        timeSpend: "",
        teacher: "Florence Samuels",
        enrolledDate: "24 Feb 2023",
        startDate: "24 Feb 2023",
        status: (
            <Tag icon={<CheckCircleOutlined />} color="success">
                Active
            </Tag>
        ),
    },
    {
        key: "4",
        no: "4",
        course: "CC27 - 1st Grade Language Arts Semester 1",
        timeSpend: "",
        teacher: "Florence Samuels",
        enrolledDate: "24 Feb 2023",
        startDate: "24 Feb 2023",
        status: (
            <Tag icon={<CheckCircleOutlined />} color="success">
                Active
            </Tag>
        ),
    },
];
const { Search } = Input;

const CourseContent = () => {

    const [sourceData, setSourceData] = useState([])
    const [collapseData, setCollapseData] = useState([])
    const { course_id } = useParams(); // Correct usage
    let params = {
        course_id: course_id, // Assuming 'id' is already defined in your scope
    };
    useEffect(() => {
        axios.get("http://localhost:4000/canvas/getcontentbyid", { params })
            .then((rlt) => {
                console.log(rlt.data)
                // setSourceData(rlt.data);
                const data = rlt.data.map((item, index) => ({
                    key: index,
                    label: item.name,
                    children: (
                        <div>
                            Lession Data
                        </div>
                    )
                }))
                setCollapseData(data);
            }).catch((error) => {
                console.error("There was an error!", error);
            });
    }, [])
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [dataSource, setDataSource] = useState(data);
    const handleChange = (pagination, filters, sorter) => {
        console.log("Various parameters", pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };
    const clearFilters = () => {
        setFilteredInfo({});
    };
    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
        setDataSource(data);
    };
    const setAgeSort = () => {
        setSortedInfo({
            order: "descend",
            columnKey: "age",
        });
    };
    const handleSearch = (value) => {
        const filteredData = data.filter((entry) =>
            entry.course.toLowerCase().includes(value.toLowerCase())
        );
        setDataSource(filteredData); // Update the data source state to the filtered data
    };
    const columns = [
        {
            title: "No",
            dataIndex: "no",
            key: "no",
            width: "5%",
            sorter: (a, b) => a.no - b.no,
            sortOrder: sortedInfo.columnKey === "no" ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: "Course",
            dataIndex: "name",
            key: "name",
            width: "28%",
            filters: [
                {
                    text: "Joe",
                    value: "Joe",
                },
                {
                    text: "Jim",
                    value: "Jim",
                },
            ],
            filteredValue: filteredInfo.course || null,
            onFilter: (value, record) => record.course.includes(value),
            sorter: (a, b) => a.course.length - b.course.length,
            sortOrder: sortedInfo.columnKey === "course" ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: "TimeSpend",
            dataIndex: "timeSpend",
            key: "timeSpend",
            width: "10%",
        },
        {
            title: "Teacher",
            dataIndex: "teacher",
            key: "teacher",
            width: "15%",
        },
        {
            title: "Date Enrolled",
            dataIndex: "enrolledDate",
            key: "enrolledDate",
            width: "10%",
        },
        {
            title: "Start Date",
            dataIndex: "startDate",
            key: "startDate",
            width: "10%",
        },
        {
            title: "Status",
            dataIndex: "published",
            key: "status",
            width: "10%",
        },
        {
            title: "Other",
            dataIndex: "other",
            key: "other",
            width: "12%",
        },
    ];
    return (
        <>
            {/* <Row style={{ padding: "20px" }}>
                <Card style={{ marginBottom: "20px", width: "100%" }}>
                    <Row>
                        <Col span={14}>
                            <Button onClick={clearAll} style={{ borderRadius: "0px" }}>
                                Clear
                            </Button>
                        </Col>
                        <Col span={10}>
                            <Search
                                placeholder="Input course name..."
                                onSearch={handleSearch}
                                style={{
                                    width: "100%",
                                    fontSize: "14px",
                                }}
                            />
                        </Col>
                    </Row>
                </Card>

                <Card
                    title={
                        <Col
                            span={24}
                            style={{
                                alignItems: "center",
                                display: "flex",
                                flexDirection: "row",
                                fontSize: "18px",
                            }}>
                            <img
                                src={attendanceImg}
                                style={{ width: "22px", height: "22px", marginRight: "5px" }}
                            />
                            My Courses
                        </Col>
                    }>
                    <Space
                        style={{
                            marginBottom: 16,
                        }}></Space>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={sourceData}
                        onChange={handleChange}
                    />
                </Card>
            </Row> */}
            <Card>
                <Typography.Title>Contents</Typography.Title>
                <Collapse items={collapseData} />
            </Card>
        </>
    );
};

export default CourseContent;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Space, Table, Row, Card, Col, Tag, Input, Button, Progress, } from "antd";
import { CheckCircleOutlined, SearchOutlined } from '@ant-design/icons';
import moment from "moment/moment";
import attendanceImg from "../../assets/svg/attendance.svg";
import axios from "axios";
import { SERVER_URL } from "../../config";


const { Search } = Input;

const Mycourses = () => {
	const [total, setTotal] = useState(0);
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [pageSize, setPageSize] = useState(9);
	const [pageNum, setPageNum] = useState(1);
	const clearAll = () => {

	};

	const columns = [
		{
			title: "",
			dataIndex: "id",
			key: "id",
			width: "3%",
			render: (id) => <span style={{ cursor: "pointer" }} onClick={() => goContents(id)}><SearchOutlined /></span>
		},
		{
			title: "Course",
			dataIndex: "name",
			key: "name",
			width: "28%"
		},
		{
			title: "Progress",
			dataIndex: "progress",
			key: "progress",
			width: "10%",
			render: (progress) => <Progress percent={progress} />,
		},
		// {
		// 	title: "Teacher",
		// 	dataIndex: "teacher",
		// 	key: "teacher",
		// 	width: "15%"
		// },
		{
			title: "Date Enrolled",
			dataIndex: "created_at",
			key: "enrolledDate",
			width: "10%",
			render: (created_at) => <span>{moment(created_at).format('DD MMM YYYY')}</span>
		},
		{
			title: "Start Date",
			dataIndex: "startDate",
			key: "startDate",
			width: "10%",
			ellipsis: true,
			render: (created_at) => <span>{moment(created_at).format('DD MMM YYYY')}</span>
		},
		{
			title: "Status",
			dataIndex: "workflow_state",
			key: "status",
			width: "10%",
			render: (workflow_state) => {
				return workflow_state == "available" ? <Tag icon={<CheckCircleOutlined />} color="success">active	</Tag> : ""
			}
		},
		// {
		// 	title: "Other",
		// 	dataIndex: "id",
		// 	key: "other",
		// 	width: "12%",
		// 	render: (id) => {
		// 		return <div>
		// 			<Row><img src={journalImg} style={{ width: "16px", height: "16px", marginRight: "5px", cursor: "pointer" }} /></Row>
		// 			<Row><img src={standardsImg} style={{ width: "16px", height: "16px", marginTop: "10px", marginRight: "5px", cursor: "pointer" }} /></Row>
		// 		</div>
		// 	}
		// },
	];

	let params = {
		pageNum: pageNum, // Assuming 'id' is already defined in your scope
	};
	const navigate = useNavigate();

	const goContents = async (course_id) => {
		navigate(`/mycourses/${course_id}`);
	};

	useEffect(() => {
		axios.get(`${SERVER_URL}/canvas/getTotal`).then(data => {
			setTotal(data.data.count);
		})
	}, [])

	useEffect(() => {
		setLoading(true)
		axios.get(`${SERVER_URL}/canvas/getcourses`, { params }).then((data) => {
			setCourses(data.data);
			console.log(data.data)
			setLoading(false);
		});
		// console.log(pageNum)
	}, [pageNum]);
	return (
		<>
			<Row style={{ padding: "20px", minHeight: "800px" }}>
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
								// onSearch={handleSearch}
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
						loading={loading}
						bordered
						columns={columns}
						dataSource={courses}
						pagination={{
							onChange: (num, size) => {
								setPageNum(num)
								setPageSize(size);
							},
							total: total,
							pageSize: pageSize,
							pageSizeOptions: [9],
						}}
					/>
				</Card>
			</Row>
		</>
	);
};

export default Mycourses;

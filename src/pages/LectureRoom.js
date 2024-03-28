import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Card } from "antd"
import axios from "axios"
import { SERVER_URL } from "../config"
const LectureRoom = () => {
    const navigate = useNavigate()
    const [data, setData] = useState()
    const location = useLocation();
    useEffect(() => {
        let params = {
            info: location.state, // Assuming 'id' is already defined in your scope
        };
        axios.get(`${SERVER_URL}/canvas/getlecture`, { params }).then(data => {
            if (data.data.body)
                setData(data.data.body);
            else {
                alert("no data")
                navigate(-1)
            }
        })
    }, [])
    return <>
        <Card title={location.state.name}>
            <CanvasPageContent htmlContent={data} /></Card>
    </>
}

function CanvasPageContent({ htmlContent }) {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}


export default LectureRoom;
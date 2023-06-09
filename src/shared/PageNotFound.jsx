import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';

const PageNotFound = () => {
    const navigate = useNavigate()
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={()=> navigate('/')}>Go Back</Button>}
        />
    )
}

export default PageNotFound;
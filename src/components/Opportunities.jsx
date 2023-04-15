import axios from 'axios'
import MainTable from '../shared/MainTable/MainTable'
import { useEffect, useState, useContext } from 'react'
import useToggle from '../customHooks/useToggle'
import { NotificationContext } from '../App'
import ResponedToOpportunity from '../forms/ResponedToOpportunity'
import { Badge } from 'antd'
import Chip from '@material-ui/core/Chip'
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

const Opportunities = () => {
    const { handleNotification } = useContext(NotificationContext)
    const [opportunities, setOpportunities] = useState([])
    const [progress, toggleProgress] = useToggle(false)

    const info = {
        header: 'Opportunities',
        dataFor: 'opportunity',
        tableHeaders: ['Photo', 'Title', 'Description', 'Owner Name', 'Owner Phone', 'State']
    }

    const responed = (data) => {
        axios.put(`http://157.230.231.198/api/v1/opportunity`, data, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then((res) => {
            console.log(res)
            let message = res.data?.opportunity?.state === 'APPROVED' ? 'Opportunity Approved Successfully' : 'Opportunity Rejected Successfully'
            handleNotification('success', message)
            axios.get('http://157.230.231.198/api/v1/opportunity', {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }).then((res) => {
                setData(res.data.opportunities)
                toggleProgress()
            }).catch(error => {
                toggleProgress()
                handleNotification('error', 'Server Error')
            })
        }).catch(error => {
            handleNotification('error', "Server Error")
            toggleProgress()
        })
    }

    const setData = (opportunitiesData) => {
        const data = opportunitiesData.map((ele) => {
            return {
                ...ele,
                ownerName: ele.owner.name,
                ownerPhone: ele.owner.phone,
                state: ele.state === 'WAPPROVAL' ? <><ResponedToOpportunity responed={responed} toggleProgress={toggleProgress} opportunity={{ ...ele }} mode="Accept" /><ResponedToOpportunity responed={responed} opportunity={ele} toggleProgress={toggleProgress} mode="Reject" /></> : ele.state === 'APPROVED' ? <Chip color="success" label="Approved" icon={<DoneIcon />} /> : <Chip color="error" label="Rejected" icon={<CloseIcon />} />
            }
        })
        setOpportunities(() => [...data])
    }

    useEffect(() => {
        toggleProgress()
        axios.get('http://157.230.231.198/api/v1/opportunity', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then((res) => {
            console.log(res)
            setData(res.data.opportunities)
            toggleProgress()
        }).catch(error => {
            console.log(error)
            handleNotification('error', 'Server Error')
        })
    }, [])
    return <MainTable info={info} data={opportunities} progress={progress} />
}

export default Opportunities
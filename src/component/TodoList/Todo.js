import React, { useState } from 'react'
import {Button, Col, Input, Row} from 'antd'
import axios from 'axios';

export default function Todo(props) {
    const [changeInput, setChangeInput] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    
    const updateTodoItem = async (id) => {
        await axios.put(`/todo-list/${id}`, {task: changeInput})
        props.fetch();
        setIsEdit(false)
    }

    const toggleEdit = () => {
        setChangeInput(props.item.task);
        setIsEdit(true)
    }

    // Best practice การ return ต้องน้อย
    let content =  (
    <Row style={{width: '100%'}}>
        <Col span={20}>
            <Input value={changeInput} onChange={ e => setChangeInput(e.target.value)}/>
        </Col>
        <Col span={4}> 
            <Button type='primary' onClick={() => updateTodoItem(props.item.id)}>Done</Button>
        </Col>
    </Row>
    )

    if(!isEdit) {
    content = (
        <Row style={{width: '100%'}}>
        <Col span={18}>
            <Row justify='right'>
                {props.item.task}
                {/* {`   this is id ${item.id}`} */}
            </Row>
        </Col>
        <Col span={3}> 
            <Button style={{backgroundColor: 'orange'}} onClick={() => toggleEdit() }>Edit</Button>
        </Col>
        <Col span={3}> 
            <Button type='danger' onClick={() => props.delete(props.item.id) }>Delete</Button>
        </Col>
        </Row>
    )
    }

  return (
    <div style={{width: '100%'}}>
    {content}
    </div>
  )
}

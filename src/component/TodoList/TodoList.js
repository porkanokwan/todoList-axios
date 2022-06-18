import React, { useEffect, useState } from 'react'
import {Button, Col, Divider, Input, List, Row} from 'antd'
import Text from 'antd/lib/typography/Text'
import _ from 'lodash'
import axios from '../config/axios'
import Todo from './Todo'

export default function TodoList() {
    const [todoList, setTodoList] = useState([]);
    const [inputValue, setInputValue] = useState('');

    // เอาออกเพราะ เพิ่ม TodoList จากการพิมพ์ข้อมูลเข้าไปได้เองแล้ว
    // useEffect( () => {
    //     setTodoList([
    //         {
    //             id: 1,
    //             task: "Do Homework"
    //         },
    //         {
    //             id: 2,
    //             task: "Play football"
    //         },
    //         {
    //             id: 3,
    //             task: "Play game"
    //         },
    //         {
    //             id: 4,
    //             task: "Read Book"
    //         }
    //     ])
    // }, [] )

    // อ่านค่าจาก backend 
    const fetchTodoList = async () => {
        const httpResponse = await axios.get('/todo-list');
        setTodoList(httpResponse.data);
    }

    // การเอา fetchTodoList มาใช้ โดยให้  render ครั้งแรกที่เปิดหน้าเว็บแล้ว render ตลอด
    useEffect( () => {
        fetchTodoList()
    }, []
    )

    const deleteTodoList = async (id) => {
        await axios.delete(`/todo-list/${id}`);
        fetchTodoList();
    }

    const addTodoItem = async () => {
        await axios.post('/todo-list', {task: inputValue});
        fetchTodoList();
        setInputValue('')
    }

    // const deleteTodoList = (id) => {
    //     const newTodoList = todoList.filter( todo => todo.id !== id )
    //     setTodoList(newTodoList)

    //     const newTodoList = [...todoList]
    //     const targetDelete = newTodoList.findIndex( todo => todo.id === id )
    //     newTodoList.splice(targetDelete, 1)
    //     setTodoList(newTodoList);
    // }

    
    // const addTodoItem = () => {
    //     const newTodoList = [...todoList]  
    //     newTodoList.push({
    //         id: _.uniqueId(),
    //         task: inputValue
    //     })
    //     setTodoList(newTodoList);
    //     setInputValue('');
    // }

  return (
    // <div style={{display: 'flex', justifyContent: 'center'}}>
    //   {/* {todoList.map( item => <div key={item.id}>{item.task}</div> )} */}
    <div>
    <Row justify='center'>
        <Col>
            <Row ><Text type='warning'>กรุณาใส่ Todo List ที่ต้องการเพิ่ม</Text></Row>
            <Row>
                <Col span={20}>
                    <Input value={inputValue} onChange = {(e) => setInputValue(e.target.value)} />
                </Col>
                <Col span={4} >
                    <Button style={{width: '100%'}} onClick={addTodoItem} >Add</Button>
                </Col>
            </Row>
            <Divider/>
            <List
            style={{width: '500px' }}
            header={<div>Todo List Page</div>}
            bordered
            dataSource={todoList}
            renderItem={item => (
                <List.Item>
                    <Todo delete = {deleteTodoList} item={item} fetch={fetchTodoList}/>
                </List.Item>
            )}
            />
      </Col>
    </Row>
    </div>
  )
}


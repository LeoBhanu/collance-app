import React, { useEffect, useState } from 'react'
import "../style/table.css"
import { useDispatch, useSelector } from 'react-redux'
import deleteicon from "../assets/deleteicon.svg"
import edit from "../assets/edit.svg"
import { User } from '../types'
import { deleteUser, selectUser } from './userSlice'
import { RootState } from '../store/store'

export const Table = () => {
  const headings = ["name", "age", "dob", "phone", "address", "email"]
  const users = useSelector((state: RootState) => state.userState.users)
  const dispatch = useDispatch()

  const handleEdit = (userData: User, index: number) => {
    dispatch(selectUser({userData, index}))
  }

  const handleDelete = (index: number) => {
    dispatch(deleteUser(index))
  }

  return (
    <section>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            {headings.map((item, index) => <th key={index}>{item}</th>)}
            <td>
              Actions
            </td>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && <tr><td colSpan={7} style={{ textAlign: 'center' }}>No User Found!</td></tr>}
          {users?.map((item: any, index: number) =>
            <tr  key={index}>
              {headings.map(col => <td>{col === "address" ? item[col].join(", ") : item[col]}</td>)}
              <td>
                <span style={{ marginRight: '20px' }} onClick={() => handleEdit(item, index)}>
                  <img src={edit} />
                </span>
                <span onClick={() => handleDelete(index)}>
                  <img src={deleteicon} />
                </span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  )
}

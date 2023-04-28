import axios from 'axios'
import '../css/Admin.css'
import appConfig from '../config/app'
import { useState } from 'react'
import { Fragment } from 'react'
import { get } from '../func/request'

function Table({ data, OpButtons, AddTermBtn }) {
    return (
        <table className='admin-table'>
            <thead>
                <tr className='table-title'>
                    <th colSpan={data ? data.length * 2 + 1 : 0}>
                        术语
                    </th>
                    <th>
                        操作
                    </th>
                </tr>
                <tr className='table-subtitle'>
                    <th>
                        ID
                    </th>
                    {
                        data?.map((val, i) => (
                            <>
                                <th>
                                    名词
                                </th>
                                <th>
                                    解释
                                </th>
                            </>
                        ))
                    }

                    <th>
                        <AddTermBtn />
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    data?.map((val, i) => (
                        <tr key={"unsolved_term_" + val.id} className='table-content'>
                            <th>
                                {val.id}
                            </th>
                            {
                                val.contents.map((c, i) => (
                                    <Fragment key={`term_${val.id}_${i}`}>
                                        <th>
                                            {c.name}
                                        </th>
                                        <th>
                                            {c.definition}
                                        </th>
                                    </Fragment>
                                ))
                            }
                            <th className='table-op'>
                                <OpButtons id={val.id} index={i} />
                            </th>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

function Admin(params) {
    const [terms, setTerms] = useState()
    const [tab, setTab] = useState()
    const [showAddTermForm, setShowAddTermForm] = useState()

    axios.get(`${appConfig.serverAddress}/search/admin/terms`)
    if (terms == null) {
        get("/search/admin/terms", res => {
            console.log(res.data)
            setTerms(res.data)
        })
    }

    const op = (id, op, index) => {
        get(`/search/admin/term?id=${id}&op=${op}`, res => {
            var d = [...terms]
            d[index].status = true
            setTerms(d)
        })
    }

    const OpButtons = ({ id, index }) => {
        if (!terms[index].status) {
            return (
                <>
                    <div className='op-enable' onClick={() => op(id, true, index)}></div>
                    <div className='op-refuse' onClick={() => op(id, false, index)}></div>
                </>
            )
        }
        return null;
    }

    const AddTerm = () => {
        return (
            <button className='add-term' onClick={() => {
                setShowAddTermForm(true)
            }}>
                添加术语
            </button>
        )
    }

    return (
        <div className="admin-view">
            <div className="status-bar">

            </div>
            <div className='content'>
                {
                    () => {
                        switch (tab) {
                            case "terms":
                                break;

                            default:
                                break;
                        }
                    }
                }
                <Table data={terms} OpButtons={OpButtons} AddTermBtn={AddTerm} />
                {
                    showAddTermForm ? (
                        <div className='add-term-bg'>
                            <div className='add-term-frame'>
                                <div className='add-term-item'>
                                    <p>NAME:</p>
                                    <input className='add-term-input' />
                                </div>
                                <button onClick={() => setShowAddTermForm(false)}>取消</button>
                            </div>
                        </div>
                    ) : (<></>)
                }
            </div>
        </div>
    )
}

export default Admin
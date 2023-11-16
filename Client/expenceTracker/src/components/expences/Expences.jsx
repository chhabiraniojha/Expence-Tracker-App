import React, { useEffect, useState, useRef } from 'react'
import Expence from "../expence/Expence"
import { ExpenceProvider } from '../context/ExpenceContext';
import ExpenceForm from '../expenceForm/ExpenceForm';
import ReactPaginate from 'react-paginate';
import "../test/test.css"


function Expences() {
    const [expences, setExpences] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const currentPage = useRef(0);
    const limit = useRef(8);




    const addExpence = (expence) => {
        setExpences((prev) => (
            [expence, ...prev]
        ))
    }


    async function removeExpence(id) {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`/api/expence/${id}`, { headers: { Authorization: token } });
        if (response.status == 200) {
            setExpences((prevExpences) => {
                return prevExpences.filter((prevExpence) => (prevExpence.id != id))
            })
        }

    }

    useEffect(() => {
        currentPage.current = 0
        getPaginatedExpence();
    }, [])

    const handlePageClick = (e) => {
        // console.log(e.selected)
        currentPage.current = e.selected;
        getPaginatedExpence();


    }
    const getPaginatedExpence = () => {
        const token = localStorage.getItem("token")
        axios.get(`/api/expence/pagination?page=${currentPage.current}&limit=${limit.current}`, { headers: { Authorization: token } })
            .then(res => {
                setExpences(res.data.expence)
                setPageCount(Math.ceil(res.data.count / limit.current))
            })
    }
    const handleLimit = (e) => {
        limit.current = e.target.value;
        currentPage.current = 0;
        getPaginatedExpence();

    }

    return (
        <ExpenceProvider value={{ addExpence, removeExpence }}>
            <div>
                <div>

                </div>
                <div>
                    {/* expences */}
                    <ExpenceForm />
                    <div className='first_table w-full pt-6'>
                        <table className='p-4' >
                            <tr>
                                <th className='p-2'>Data</th>
                                <th className='p-2'>Description</th>
                                <th className='p-2'>Category</th>
                                <th className='p-2'>Income</th>
                                <th className='p-2'>Expense</th>
                                <th className='p-2'>Action</th>
                            </tr>
                            {expences.map((expence) => {
                                return (

                                    <tr key={expence.id}>
                                        <td className='td p-2'>{new Date(expence.createdAt).toDateString()}</td>
                                        <td className='td p-2'>{expence.expenceDescription}</td>
                                        <td className='td p-2'>{expence.expenceCategory}</td>
                                        <td className='td'></td>
                                        <td className='td p-2'>{expence.expenceAmount}</td>
                                        <td>
                                            <div className='text-center'>
                                                <button  onClick={(e)=>removeExpence(expence.id)} className=' bg-red-700 px-2 rounded-md text-white'>
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )

                            })}
                        </table>
                    </div>
                    <div className='container'>
                        <div className='w-full text-center p-4'>
                            <label className='text-lg px-2'>Limit Per Page</label>
                            <select className='border-2 border-gray-700 px-2 text-blue-800' onChange={handleLimit}>
                                <option value={5}>5</option>
                                <option value={8} selected>8</option>
                                <option value={12}>12</option>
                                <option value={15}>15</option>
                                <option value={29}>20</option>
                            </select>
                        </div>
                        <div >
                            {/* <Items currentItems={currentItems} /> */}
                            <ReactPaginate
                                previousLabel="previous"
                                nextLabel="next"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                pageCount={pageCount}
                                pageRangeDisplayed={8}
                                marginPagesDisplayed={2}
                                onPageChange={handlePageClick}
                                containerClassName="pagination justify-content-center"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                activeClassName="active"
                                forcePage={currentPage.current}
                            // eslint-disable-next-line no-unused-vars


                            />
                        </div>
                    </div>
                </div>
            </div>
        </ExpenceProvider>
    )
}

export default Expences
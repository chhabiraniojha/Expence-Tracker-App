import React, { useEffect, useState } from 'react'
import Expence from "../expence/Expence"
import { ExpenceProvider } from '../context/ExpenceContext';
import ExpenceForm from '../expenceForm/ExpenceForm';

function Expences() {
    const [expences, setExpences] = useState([]);


    const addExpence = (expence) => {
        setExpences((prev) => (
            [expence, ...prev]
        ))
    }
  

    async function removeExpence(id) {
        const response = await axios.delete(`/api/expence/${id}`);
        if (response.status == 200) {
            setExpences((prevExpences) => {
                return prevExpences.filter((prevExpence) => (prevExpence.id != id))
            })
        }

    }

    useEffect(() => {
        const token=localStorage.getItem("token")
        axios.get('/api/expence',{headers:{Authorization:token}})
            .then(res => setExpences(res.data))
    }, [setExpences, removeExpence])



    return (
        <ExpenceProvider value={{ addExpence, removeExpence }}>
            <div>
                <div>

                </div>
                <div>
                    {/* expences */}
                    <ExpenceForm />
                    <div className=''>
                        <div >
                            <ul className='flex flex-1 flex-wrap p-4'>
                                {expences.map((expence) => (
                                    <Expence key={expence.id} expence={expence} />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </ExpenceProvider>
    )
}

export default Expences

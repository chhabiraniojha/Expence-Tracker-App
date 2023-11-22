import React, { useEffect, useState } from 'react'
import JsFileDownloader from 'js-file-downloader';

function History() {
  const [downloadHistory, setDownlosdHistory] = useState([]);
  const getDownloadHistory = async () => {
    try {
      const token=localStorage.getItem('token')
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/expence/downloadedreports`, { headers: { Authorization: token } })
      setDownlosdHistory(response.data.response)
    } catch (error) {
      console.log(error)
      setDownlosdHistory([])
    }
  }
  useEffect(() => {
    getDownloadHistory()
  }, [])
 const handleDownload=(url)=>{
     console.log(url)
     new JsFileDownloader({
      url: url
    })
      .then(function () {
        alert('download successfully')
        // Called when download ended
      })
      .catch(function (error) {
        alert(error)
        // Called when an error occurred
      });
 }
  return (
    <div>
       <div>
          {downloadHistory.map((history)=>{
               return (
                <div  key={history.id}>
                  <div >{new Date(history.createdAt).toDateString()}</div>
                  <div >{history.expenceUrl}</div>
                  <div ><button onClick={()=>{handleDownload(history.expenceUrl)}} className='bg-red-700 rounded-md text-center text-white p-2'>download</button></div>

                </div>
               )
          })}
       </div>
    </div>
  )
}

export default History;

import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { api, apiNoToken } from './network/api';

function App() {

  const [member, setMember] = useState()

  const [data, setData] = useState([])


  const onSubmitHandler = async (e) => {
    e.preventDefault()
    await apiNoToken('api', 'POST', member)
    setData([...data, { ...member, id: data[data.length].id + 1 }])
  }

  const getData = async () => {
    const { data } = await apiNoToken('api', 'GET')
    setData(data)
  }

  const onBlurHandler = (e) => {
    const { name, value } = e.target
    setMember({ ...member, [name]: value })
  }


  useEffect(() => {
    getData()
  }, [])



  return (
    <div className="App">
      <header >
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <form style={{ display: 'flex', gap: 10 }} onSubmit={onSubmitHandler}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }} >
            이름
            <input style={{ width: 100 }} name='name' onBlur={onBlurHandler} ></input>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            description
            <input style={{ width: 100 }} name='description' onBlur={onBlurHandler} ></input>
          </div>

          <button type='submit'> 확인 </button>

        </form>


        <section>

          {data.map((member) =>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }} id={member.id}>
              <div>{member.id}</div>
              <div>{member.name}</div>
              <div>{member.description}</div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;

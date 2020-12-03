import { Card, CardContent, FormControl, Menu, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import Infobox from './Infobox'
import LineGraph from './LineGraph';
import Map from './Map';
import Table from './Table';
import { sortData } from './utli';


function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('Worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])

  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data)
    })
  },[])

  useEffect(()=>{
    const getCountriesData = async ()=>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=>response.json())
      .then((data)=>{
        const countrys = data.map((country)=>({
            name : country.country,
            value:country.countryInfo.iso2,
        }))
        const sortedData  = sortData(data)
        setCountries(countrys)
        setTableData(sortedData)
      })
    }
    getCountriesData()
  },[])

  const onCountryChange = async (event)=>{
    const countryCode = event.target.value;

    setCountry(countryCode)
    const url =  countryCode === "Worldwide"? "https://disease.sh/v3/covid-19/al": `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then(response => response.json())
    .then(data =>{
      setCountryInfo(data)
    })
  }
  console.log(country);
  console.log(countryInfo);
  console.log(tableData);

  return ( 
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>covid \-tracker</h1>
          <FormControl className='app__dropdown'>
            <Select 
            variant='outlined'
            value={country}
            onChange={onCountryChange}
            >
              <Menu value="worldwide" >Worldwide</Menu>
              {
                countries.map(country=>(
                  <MenuItem value={country.value} >{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
              <Infobox title="coronovirus total" cases={countryInfo.todayCases} total={countryInfo.cases}/>
              <Infobox title='recoverd' cases={countryInfo.todayRecovered} total={countryInfo.recoverd}/>
              <Infobox title='Deaths' cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>
        <Map/>
        </div>
      <div className="app__right">
        <Card className='app__right'>
          <CardContent>
            <h3>Live case By country</h3>
            <Table countries={tableData}/>
            <h3>Worldwide new cases</h3>
            <LineGraph/>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;

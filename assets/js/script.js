const clock = new Date().getHours()
const theme = clock<18 && clock>7 ?'light':'dark'
document.querySelector(".layout").classList.add(theme)

const requestOptions = {
  method: "GET",
  redirect: "follow"
};

fetch("https://api.dastyar.io/express/weather?lat=35.67194277&lng=51.42434403", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    renderDescription(result[0])
    renderList(result.slice(1))
  })
  .catch((error) => console.error(error));


const renderDescription=(data) =>{

  document.querySelector(".description img").src=imgSrc(data.weather.main)

  const today = new Intl.DateTimeFormat('fa-u-ca-persian', { weekday:"short",day:"numeric",month:"short" }).format(new Date(data.date))
  document.querySelector(".date").innerHTML=today;

  document.querySelector(".temprature").innerHTML= `${Math.round(data.current)}°`

  document.querySelector(".state").innerHTML=data.customDescription.text

  document.querySelector(".max-temprature").innerHTML=`${Math.round(data.max)}° حداکثر`

  document.querySelector(".min-temprature").innerHTML=`${Math.round(data.min)}° حداقل`
}

const renderList=(data) =>{
  const table = document.querySelector(".weathers .table")
  console.log(table)
  data.forEach((item)=>{
    const tr = document.createElement("tr")


    const date_td = document.createElement("td")
    date_td.innerHTML = new Intl.DateTimeFormat('fa-u-ca-persian', { weekday:"short" }).format(new Date(item.date))
    tr.appendChild(date_td)


  const icon_td = document.createElement("td")
  const icon_img = document.createElement('img')
  icon_img.src = imgSrc(item.weather.main)
  icon_td.appendChild(icon_img)

  tr.appendChild(icon_td)

  const max_td = document.createElement("td")
  max_td.innerHTML = `${Math.round(item.max)}° حداکثر`
  tr.appendChild(max_td)


  const min_td = document.createElement("td")
  min_td.innerHTML = `${Math.round(item.min)}° حداقل`
  tr.appendChild(min_td)

    table.tBodies[0].appendChild(tr)
  })
}
const imgSrc =(data) => {
  return ["Clouds","Rain","Clear"].includes(data)? `/assets/images/icon/${theme}/${data}.png`:`/assets/images/icon/${theme}/Clear.png`
} 
window.addEventListener("load", () =>{
    let form = document.querySelector("form")
    let MARKETS = markeing.slice(0, 20)
    let templete = document.querySelector("template").content
    let market__items = document.querySelector(".market__items")
    let search__market= document.querySelector(".search__market")
    let select__model = document.querySelector(".select__model")
    let bookmark__templete = document.querySelector(".bookmark__templete").content
    const bookmark__items = document.querySelector(".bookmark__items")
    const bookmark = window.localStorage.getItem("bookmark") ? JSON.parse(window.localStorage.getItem("bookmark")) : []
    const handleRenderMarket = (arr) =>{
        if(arr?.length){
            market__items.innerHTML = null
            for(let i = 0; i<arr.length; i++){
                let clone = templete.cloneNode(true)
                let img = clone.querySelector(".market__img")
                img.src = arr[i].bigPoster
                let name = clone.querySelector(".market__name")
                name.textContent = arr[i].name
                let price = clone.querySelector(".price")
                price.textContent = arr[i].price
                let bookmark__btn = clone.querySelector(".bookmark__btn")
                bookmark__btn.dataset.id = arr[i].name
                market__items.appendChild(clone)
            }
        }
    }
    let handleFilterModel = (arr) => {
        let result = []
        for(let i = 0; i<arr.length; i++){
            let models = arr[i].model
            for(let si = 0; si<models.length; si++){
                if(!result.includes(models[si])){
                    result.push(models[si])
                }
            }
        }
        return result
    }   
    const handleCreateOption = () =>{
        let model = handleFilterModel(MARKETS)
        for(let i = 0; i<model.length; i++){
            let option = document.createElement("option")
            option.value = model[i]
            option.textContent = model[i]
            select__model.appendChild(option)
        }
    }   
     
    handleCreateOption()
    const handleSub = (event) => {
        event.preventDefault()
        let rejex = new RegExp(search__market.value, "gi")
        let filter = []
        if(select__model.value === "all"){
            filter = MARKETS
        }else if(select__model.value !== "all"){
            filter = MARKETS.filter(item => item.model.includes(select__model.value))
        }
        if(search__market.value.length){
            filter = filter.filter(item => item.name.match(rejex) )
        }
        handleRenderMarket(filter)
    }
    form.addEventListener("submit", handleSub)

    const handleRenderBookmarkMarkets = (arr) => {
        if(arr?.length){
            bookmark__items.innerHTML = null
            for(let i = 0; i<arr.length; i++){
                let clone = bookmark__templete.cloneNode(true)
                let name = clone.querySelector(".name")
                name.textContent = arr[i].name
                let price = clone.querySelector(".price")
                price.textContent = arr[i].price
                let delete__bookmark = clone.querySelector(".delete__bookmark")
                delete__bookmark.dataset.id = arr[i].name
                bookmark__items.appendChild(clone)
            }
        }else{
            let h2 = document.createElement("h2")
            h2.textContent = "Hali hech narsa sotib olinmagan"
            // h2 .className.add("text-danger")
            bookmark__items.appendChild(h2)
        }
    }
    const handleClick = (event) =>{
        let id = event.target.dataset.id
        if(event.target.matches(".bookmark__btn")){
            let market = MARKETS.find(item => item.name === id)
            if(bookmark.length){
                // let some = bookmark.some(item => item.name === id)
                if(!bookmark.some(item => item.name === id)){
                    bookmark.push(market)
                    handleRenderBookmarkMarkets(bookmark)
                    window.localStorage.setItem("bookmark", JSON.stringify(bookmark))
                }
            }else{
                bookmark.push(market)
                handleRenderBookmarkMarkets(bookmark)
                window.localStorage.setItem("bookmark", JSON.stringify(bookmark))
            }
        }else if(event.target.closest(".delete__bookmark")){
            let filter =  bookmark.filter(item => item.name !== id)
            handleRenderBookmarkMarkets(filter)
            window.localStorage.setItem("bookmark", JSON.stringify(filter))
            window.location.reload()
        }
    }
    window.addEventListener("click", handleClick)
    handleRenderBookmarkMarkets(bookmark)
    handleRenderMarket(MARKETS)
})
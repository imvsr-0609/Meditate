const app = ()=>{

    const song = document.querySelector(".song")
    const play = document.querySelector(".play")
    const outline = document.querySelector(".moving-outline circle")
    const video = document.querySelector(".vid-container video")

    const sounds = document.querySelectorAll(".sound-picker button")
    const timeDisplay = document.querySelector(".time-display")
    const timeSelect = document.querySelectorAll(".time-select button")

    const outlineLength = outline.getTotalLength()

    var fakeduration = 10

    outline.style.strokeDasharray = outlineLength
    outline.style.strokeDashoffset = outlineLength


    play.addEventListener("click",()=>{
        checkPlay(song)
        
    })

   
   

  sounds.forEach(sound=>{
    sound.addEventListener("click" , () => {
        song.src= sound.getAttribute("data-sound")
        video.src= sound.getAttribute("data-video")
      
        
    })

  })


  timeSelect.forEach(option => {
    option.addEventListener("click", () => {
    fakeduration = option.getAttribute("data-time")
    timeDisplay.textContent = `${Math.floor(fakeduration / 60)}:${Math.floor(fakeduration % 60)}`
        
        
    })
})

  const checkPlay = song=>{
    if(song.paused){
        song.play()
        video.play()
        play.src="pause.svg"
    }
    else{
        song.pause()
        video.pause()
        play.src="play.svg"
    }
  }


 song.ontimeupdate = ()=>{
     let currentTime = song.currentTime
     let elapsed = fakeduration - currentTime
     let seconds = Math.floor(elapsed % 60)
     let minutes = Math.floor(elapsed / 60)


     let progress = outlineLength-(currentTime / fakeduration)*outlineLength
     outline.style.strokeDashoffset=progress

     timeDisplay.textContent = `${minutes}:${seconds}`

     if(currentTime>=fakeduration){
         song.pause()
         video.pause()
         video.currentTime=0
         song.currentTime=0
         play.src="play.svg"
     }

   }
console.log(sounds)
console.log(timeSelect)

}


app()



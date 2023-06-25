import React from 'react';
import HeroSlider from "hero-slider";
import { Slide,Overlay,  MenuNav  } from 'hero-slider';
import { getSlider,sliderReset } from '../../features/sliderSlice';
import {useDispatch,useSelector} from "react-redux";
import Wrapper from '../Wrapper';
import Subtitle from '../Subtitle';
import Title from '../Title';

const Sliderr = () => {
  const dispatch =useDispatch();
  const {slider,sliderLoading,sliderSuccess}=useSelector((state)=>state.slider);

  React.useEffect(()=>{
dispatch(getSlider())
  },[]);


  React.useEffect(()=>{
if(sliderSuccess===true){
    dispatch(sliderReset())
}
  },[sliderLoading])

 // console.log(slider?slider:"Slider is empty");


  let sliderDisplay=[];
  if(slider!==null){
    sliderDisplay=slider?.map((item)=>{
          const urlValue=item.url;
          return (
            <Slide
            shouldRenderMask
             key={item._id}
            background={{
              backgroundImageSrc: item.url
            }}
          />
          )

    })
  }

   

    

  return (
<HeroSlider
      autoplay
      controller={{
        initialSlide: 1,
        slidingDuration: 1000,
        slidingDelay: 1,
        onSliding: (nextSlide) =>
          console.debug("onSliding(nextSlide): ", nextSlide),
        onBeforeSliding: (previousSlide, nextSlide) =>
          console.debug(
            "onBeforeSliding(previousSlide, nextSlide): ",
            previousSlide,
            nextSlide
          ),
        onAfterSliding: (nextSlide) =>
          console.debug("onAfterSliding(nextSlide): ", nextSlide)
      }}
    >
        <Overlay>
        <Wrapper>
          <Title>Thisara <span className='title-sub' >Salon</span></Title>
          <Subtitle>
          Indulge in Luxury, Discover Your Beauty
          </Subtitle>
        </Wrapper>
      </Overlay>
      

      {/* <Slide
  
        label="Giau Pass - Italy"
        background={{
          backgroundImageSrc: giauPass
        }}
      />

      <Slide
      
       
        background={{
          backgroundImageSrc: bogliasco
        }}
      />

      <Slide

    
        background={{
          backgroundImageSrc: countyClare
        }}
      />

      <Slide

        background={{
          backgroundImageSrc: craterRock
        }}
      /> */}
      {sliderDisplay}

    
    </HeroSlider>



  )
}

export default Sliderr
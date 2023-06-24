import React from 'react';
import "./About.css";
import massage from "../../assets/massage.jpg";
import beauty from "../../assets/beauty.png";
import cutting from "../../assets/cutting.jpg";
import business from "../../assets/business.jpg";
import aid from "../../assets/aid.PNG";
import safe from "../../assets/safe.PNG";
import { useSelector } from 'react-redux';

const About = () => {

    const {screen}=useSelector((state)=>state.user)
  return (
    <div className='about'>

         <div className="about-page" 
         style={{}}
         >
      <h1 className="about-title">Welcome to Thisara Salon</h1>
      <p className="about-description">
        I'm thrilled to introduce myself and offer you a glimpse into the world of beauty and relaxation I provide. With over 15 years of experience as a beautician, I have honed my skills in various domains, ensuring that you receive top-notch services tailored to your unique needs.
      </p>
      <p className="about-description">
        As a beautician, I am passionate about helping my clients discover their inner beauty and boost their self-confidence. I have acquired a diverse range of diplomas and certifications to offer you a comprehensive set of services.
      </p>
      <p className="about-description">
        My expertise in makeup artistry allows me to create stunning looks that enhance your natural features and reflect your individuality. Whether you desire a glamorous evening makeover or a subtle daytime radiance, I possess the skills to bring your vision to life.
      </p>
      <p className="about-description">
        In addition to makeup, I specialize in massage therapy, utilizing various techniques to relax your body and rejuvenate your mind. My knowledge and experience in different massage modalities, such as Swedish, deep tissue, and aromatherapy, enable me to customize each session according to your specific requirements.
      </p>
      <p className="about-description">
        When it comes to hair, I stay updated on the latest trends and techniques in hair cutting technology. With an eye for detail and a commitment to delivering exceptional results, I can provide you with a wide range of hairstyling options, from classic cuts to trendy designs.
      </p>
      <p className="about-description">
        As a professional, I prioritize your safety and well-being. I hold certifications in accidental emergency risk management and first aid, ensuring that I am prepared to handle any unforeseen situations. Additionally, my salon is fully insured, guaranteeing a secure environment where you can relax without worries.
      </p>
      <p className="about-description">
        I invite you to experience the personalized service and attention to detail that sets me apart. Step into my salon, and let me create a transformative experience for you, where you can feel pampered, beautiful, and completely at ease. I am dedicated to delivering exceptional service and ensuring your satisfaction with every visit.
      </p>
      {/* <p className="about-description">
        Book an appointment with me through our salon web app, and let's embark on a journey of self-care and indulgence together. I look forward to meeting you and helping you achieve your beauty goals.
      </p> */}
    </div>


    <div className="diploma-certificates">
    
      <h2 className="certificates-title">Our Achievements</h2>

      <div className="certificate-item">
        <img
          src={beauty}
          alt="Beautician Makeup Diploma"
          className="certificate-image"
           style={{width:screen<553?"90%":"500px"}}
        />
        <p className="certificate-caption">Beautician Makeup</p>
      </div>

      <div className="certificate-item">
        <img
          src={massage}
          alt="Massage Therapy Diploma"
          className="certificate-image"
          style={{width:screen<553?"90%":"500px"}}
        />
        <p className="certificate-caption">Massage Therapy</p>
      </div>


      <div className="certificate-item">
        <img
          src={cutting}
          alt="Hair Cutting Technology Diploma"
          className="certificate-image"
          style={{width:screen<553?"90%":"500px"}}
        />
        <p className="certificate-caption">Hair Cutting Technology</p>
      </div>


      <div className="certificate-item">
        <img
          src={aid}
          alt="Accidental Emergency Risk Management Diploma"
          // className="certificate-image"
          style={{width:screen<553?"90%":"500px"}}
        />
        <p className="certificate-caption">Accidental Emergency Risk Management</p>
      </div>


      <div className="certificate-item">
        <img
          src={business}
          alt="Development and Business Management Diploma"
          className="certificate-image"
          style={{width:screen<553?"90%":"500px"}}
        />
        <p className="certificate-caption">Development and Business Management</p>
      </div>

      <div className="certificate-item">
        <img
          src={safe}
          alt="Development and Business Management Diploma"
          className="certificate-image"
          style={{width:screen<553?"90%":"500px"}}
        />
        {/* <p className="certificate-caption">Development and Business Management</p> */}
      </div>


    </div>


        </div>
  )
}

export default About
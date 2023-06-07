import React from 'react';
import "./CategoryPage.css";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ServiceCard from '../ServiceCard/ServiceCard';
import { getServices, serviceReset } from '../../features/serviceSlice';

const CategoryPage = () => {
    const category = useParams()?.id;
    const dispatch = useDispatch();
    const { service, serviceLoading } = useSelector((state) => state.service);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            dispatch(getServices());
            setLoading(false)
        }, 2000);


        return () => clearTimeout(timer); // Cleanup the timer when the component unmounts
    }, []);





   // console.log(service)
    const serviceDisplay = service?.map((item) => {
        if (item.category === category.toLowerCase()) {
            return (
                <ServiceCard key={item._id} {...item} userDisplay={true} />
            )
        }
    })

    return (
        <>
            {loading === true ?

                <div style={{
                    width: "100%",
                    minHeight: "80vh",
                    display: "flex", alignItems: "center",
                    justifyContent: "center",


                }}>
                    <div className="loading-wave">
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                    </div>
                </div>
                :

                <div className='category-page'>
                    {serviceDisplay}
                </div>
            }







        </>
    )
}

export default CategoryPage
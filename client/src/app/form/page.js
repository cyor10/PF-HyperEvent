"use client"
import React, { useState } from "react";
import PartOne from "./PartOne";
import PartTwo from "./PartTwo";
import PartThree from "./PartThree";
import PartFour from "./PartFour";
import { IconArrowLeft } from "@/utils/svg/svg";
import axiosInstance from "../../utils/axiosInstance"
import { validateEventField } from "@/validate/validate";
import { useRouter } from 'next/navigation';
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import StarsModal from "../components/Modals/starsModal";
import CommentModal from "../components/Modals/commentModal";

export default function Form() {
  const [page, setPage] = useState(0);

   

  const [formData, setFormData] = useState({
    event_name: '',
    org_name: '',
    category: '',
    address: '',
    place_name: '',
    country: '',    
    city: '',
    state: '',
    postal: '',
    start_at: '',
    end_at: '',
    intro: '',
    description: '',  
    social_media: [],
    event_image: null,
    stock: 0,
    price: 0,    
  });

  const [errors, setErrors] = useState({
    event_name: '',
    org_name: '',
    category: '',
    address: '',
    country: '',
    city: '',
    state: '',
    postal: '',
    start_at: '',
    end_at: '',
    intro: '',
    description: '',
    social_media: [],
    event_image: null,
    stock: 0,
    place_name: '',
    price: 0,
  });

  const FormTitles = ["Sign Up", "Personal Info", "Other", "Finish"];

  const PageDisplay = () => {
    if (page === 0) {
      return <PartOne formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} validateEventField={validateEventField} />;
    } else if (page === 1) {
      return <PartTwo formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} validateEventField={validateEventField} />;
    } else if (page === 2){
      return <PartThree formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} validateEventField={validateEventField} />;
    } else{
      return <PartFour formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} validateEventField={validateEventField} />;
    }
  };

  //console.log("",formData)
  const [showStarsModal, setShowStarsModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const reduxUser = useSelector((state) => state.counter);

  const handleSubmit = async (event) => {
    try {
      let cloud = new FormData();

      for (const [key, value] of Object.entries(formData)) {
        cloud.append(`${key}`, value);
      }

      const { data } = await axiosInstance.post('/events', cloud, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data) {
        console.log('Event created:', data);
        toast.success("Event created succesfully", {
          style: {
            border: '3px solid #925FF0',
            padding: '16px',
            color: "#925FF0",
          },
          iconTheme: {
            primary: "#925FF0",
            secondary: '#FFFAEE',
          },
        })
        setShowStarsModal(true);
      
        // Puedes hacer algo con la respuesta del servidor si es necesario
      }
    } catch (error) {
      console.log('Error:', error);
      toast.error("No puedes crear eventos duplicados", {
        style: {
          border: '3px solid #925FF0',
          padding: '16px',
          color: "#925FF0",
        },
        iconTheme: {
          primary: "#925FF0",
          secondary: '#FFFAEE',
        },
      })
    }
  };
  const sendCommentAndRatingToServer = async (comment, rating, reduxUser ) => {
    try {
      const dataToSend = {
        comment: comment,
        rating: rating,
        user_id: reduxUser.id, 
      };
      const response = await axiosInstance.post("/postComment", dataToSend);
      console.log("Comentario y calificación enviados exitosamente:", response.data);
    } catch (error) {
      console.error("Error al enviar el comentario y calificación:", error);
    }
  };

  return (
    <div className='pt-20 ml-4 pb-10 px-[.5rem] font-figtree md:my-10'>
            <button
          hidden={page === 0}
          onClick={() => {
            setPage((currPage) => currPage - 1);
          }}>
          <IconArrowLeft/>
        </button>
    <div>
    <form className="body" onSubmit={handleSubmit}>
  {PageDisplay()} 
  <button
    className="mr-4 w-[95%] mt-8 mx-auto h-12 bg-purpleOscuro rounded text-white md:w-[50%] md:mx-[25%]"
    type="button" // Cambiamos el tipo de botón a "button"
    onClick={() => {
      if (page === FormTitles.length - 1 && document.activeElement.innerText === "PUBLISH") {
        handleSubmit(); // Enviamos el formulario solo si la página actual es la última y el botón presionado es "PUBLISH"
        
      } else {
        window.scrollTo({top: 0})
        setPage((currPage) => currPage + 1);
        
      }
    }}
  >
    {page === FormTitles.length - 1 ? "PUBLISH" : "NEXT"}
  </button>
  <button type="submit" style={{ display: "none" }}></button> {/* Agregamos un botón oculto de tipo "submit" para que el formulario se envíe al presionar "Enter" */}
</form>
    </div>
    {/* Modal de calificación de estrellas */}
    {showStarsModal && (
        <StarsModal
          isOpen={showStarsModal}
          onRequestClose={() => setShowStarsModal(false)}
          onNextClick={(rating) => {
            setRating(rating);
            setShowCommentModal(true);
          }}
          user={user}
          />
      )}

      {/* Modal de comentarios */}
      {showCommentModal && (
        <CommentModal
          isOpen={showCommentModal}
          onRequestClose={() => setShowCommentModal(false)}
          onNextClick={(comment) => {
            setComment(comment);
            // Llama a la función sendCommentAndRatingToServer para enviar el comentario, calificación y usuario
            sendCommentAndRatingToServer(comment, rating, reduxUser);
          }}
          user={user} // Pasa la información del usuario
        />
      )}
  </div>
  );
}
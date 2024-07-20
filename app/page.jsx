import AboutThree from "@/components/homes/about/AboutThree";
import HeaderFour from "@/components/homes/headers/HeaderFour";
import HeaderThree from "@/components/homes/headers/HeaderThree";
import PersonalInfoThree from "@/components/homes/personalInfo/PersonalInfoThree";
import BlogsThree from "@/components/homes/blogs/BlogsThree";
import React from "react";
const express = require('express');
const cors = require('./corsConfig'); // Asegúrate de ajustar la ruta según sea necesario

const app = express();

app.use(cors);

export const metadata = {
  title: "José Reimondez || Inicio",
  
};

export default function Home3() {
  return (
    <>
      <div className="page-wrapper home-3">
        <HeaderFour />
        <div className="container z-index-3">
          <div className="row">
            <PersonalInfoThree />
            <div className="col-xxl-8 col-xl-8 col-lg-8">
              <HeaderThree />
              <BlogsThree />
              <AboutThree />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

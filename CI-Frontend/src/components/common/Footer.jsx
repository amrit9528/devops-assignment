import { React, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
// Images
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import "./Footer.css";
import {
  FaLinkedin,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";

export const Footer = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 300, // Set the duration of animations (in milliseconds)
      // If true, will only animate elements once
    });
  }, []);
  return (
    <div>
      <footer className='footer'>
        <div className='container'>
          <div className='row'>
            <div className='footer-col' data-aos='slide-up'>
              <h4>About</h4>
              <ul>
                <li>
                  <a href='#'>about us</a>
                </li>
                <li>
                  <a href='#'>our services</a>
                </li>
                <li>
                  <a href='#'>privacy policy</a>
                </li>
              </ul>
            </div>
            <div className='footer-col' data-aos='slide-up'>
              <h4>Get Help</h4>
              <ul>
                <li>
                  <a href='#'>FAQ</a>
                </li>
                <li>
                  <a href='#'>Payments</a>
                </li>
                <li>
                  <a href='#'>Courses</a>
                </li>
              </ul>
            </div>
            <div className='footer-col' data-aos='slide-up'>
              <h4>Contact us</h4>
              <ul>
                <li>
                  <a href='mailto:ankitjaat24u@gmail.com?body=fell free to type'>
                    Gmail
                  </a>
                </li>
                <li>
                  <a href='tel:8449035579'>Helpline No</a>
                </li>
              </ul>
            </div>
            <div className='footer-col' data-aos='slide-up'>
              <h4>follow us</h4>
              <div className='social-links' data-aos='flip-up'>
                <a
                  href='https://www.linkedin.com/in/ankitmalik00/'
                  target='blank'
                >
                  <FaLinkedin className=' mx-auto mt-3 scale-125' />
                </a>
                <a href='https://twitter.com/ankitmalik84' target='blank'>
                  <FaTwitter className=' mx-auto mt-3 scale-125' />
                </a>

                <a
                  href='https://www.instagram.com/ch.ankit.malik/'
                  target='blank'
                >
                  <FaInstagram className=' mx-auto mt-3 scale-125' />
                </a>
                <a href='https://github.com/ankitmalik84' target='blank'>
                  <FaGithub className=' mx-auto mt-3 scale-125' />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          className='p-8 flex flex-col sm:flex-row justify-center items-center gap-4 '
          data-aos='zoom-out'
        >
          <p className='text-white text-2xl my-2  '>© 2024</p>
          <div className=' '>
            <img src={Logo} alt='' />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

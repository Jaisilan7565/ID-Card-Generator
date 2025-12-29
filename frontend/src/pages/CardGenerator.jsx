import { useEffect, useState } from "react";
import IDCard from "../components/IDCard";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCardAPI } from "../services/IDCardServices";
import { Link, useNavigate } from "react-router-dom";

const CardGenerator = () => {
  const [studentsData, setStudentsData] = useState();
  const [studentPhoto, setStudentPhoto] = useState(null);
  const [schoolLogo, setSchoolLogo] = useState(null);

  const handleSchoolLogoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSchoolLogo(file);
    }
  };

  const handleStudentPhotoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStudentPhoto(file);
    }
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // New ID Card Mutation
  const {
    mutateAsync: addIDCardMutate,
    isLoading,
    error,
  } = useMutation({
    mutationFn: createCardAPI,
    mutationKey: ["createCard"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getIDCards"] });
      navigate("/");
    },
  });

  // Form validation schema
  const validationSchema = Yup.object().shape({
    schoolName: Yup.string().required("School name is required"),
    regNo: Yup.string().required("Registration number is required"),
    studentName: Yup.string().required("Student name is required"),
    sd_of_mr: Yup.string().required("SD of MR is required"),
    sd_of_mrs: Yup.string().required("SD of MRS is required"),
    class: Yup.string().required("Class is mandatory"),
    dob: Yup.date()
      .required("Date of birth is required")
      .max(new Date(), "Date of birth cannot be in the future"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string()
      .required("Contact number is required")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits")
      .matches(/^[0-9\-+ ]+$/, "Invalid phone number"),
  });

  const formik = useFormik({
    initialValues: {
      schoolName: "",
      regNo: "",
      studentName: "",
      sd_of_mr: "",
      sd_of_mrs: "",
      class: "",
      dob: "",
      address: "",
      phone: "",
    },

    validationSchema, // Make sure to update your validation schema accordingly
    onSubmit: async (values) => {
      console.log(values);

      if (!studentPhoto || !schoolLogo) {
        alert("Please select all the Required Images!");
        return;
      }

      try {
        const formData = new FormData();
        Object.entries(studentsData).forEach(([key, value]) => {
          formData.append(key, value);
        });
        formData.append("schoolLogo", schoolLogo);
        formData.append("studentPhoto", studentPhoto);

        await addIDCardMutate(formData)
          .then(() => {
            formik.resetForm();
            setSchoolLogo(null);
            setStudentPhoto(null);

            alert("ID Card Created Successfully!");
          })
          .catch((error) => {
            console.error("Error creating ID Card:", error);
          });
      } catch (error) {
        console.error("Error creating ID Card:", error);
      }
    },
  });

  useEffect(() => {
    setStudentsData(formik.values);
  }, [formik.values, studentsData, schoolLogo, studentPhoto]);

  return (
    <div className="bg-gray-200 h-full p-4">
      <div className="bg-black/60 text-white backdrop-blur-2xl px-4 py-2 rounded-md mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Create ID Card</h1>
          <p>
            Fill in the details below to generate your personalized ID card.
          </p>
        </div>
        <Link
          to={"/"}
          className="bg-white text-black px-4 py-2 rounded-md hover:bg-white/80 hover:scale-105 hover:font-semibold transition duration-300 ease-in-out"
        >
          ID Card Gallery
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:max-h-[80vh]">
        <form
          onSubmit={formik.handleSubmit}
          className=" grid grid-cols-2 gap-4 p-4 space-y-2 border border-gray-300 rounded-md bg-white overflow-y-auto md:max-h-[80vh]"
        >
          <span className="text-2xl font-bold underline col-span-2 rounded-md">
            School Details
          </span>
          <div className="col-span-2">
            <label className="block mb-1 font-semibold" htmlFor="schoolName">
              School Name: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="schoolName"
              name="schoolName"
              value={formik.values.schoolName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`block w-full rounded-md py-2 px-3.5 shadow-sm border ${
                formik.touched.schoolName && formik.errors.schoolName
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-gray-500 focus:border-gray-500"
              } focus:outline-none focus:ring-2 focus:ring-opacity-50 sm:text-sm`}
            />
            {formik.touched.schoolName && formik.errors.schoolName && (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.schoolName}
              </div>
            )}
          </div>
          <div className="">
            <label className="block mb-1 font-semibold" htmlFor="regNo">
              Reg No.: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="regNo"
              name="regNo"
              value={formik.values.regNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`block w-full rounded-md py-2 px-3.5 shadow-sm border ${
                formik.touched.regNo && formik.errors.regNo
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-gray-500 focus:border-gray-500"
              } focus:outline-none focus:ring-2 focus:ring-opacity-50 sm:text-sm`}
            />
            {formik.touched.regNo && formik.errors.regNo && (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.regNo}
              </div>
            )}
          </div>

          <div className="">
            <label className="block mb-1 font-semibold" htmlFor="schoolLogo">
              School Logo:
            </label>
            <input
              type="file"
              id="schoolLogo"
              name="schoolLogo"
              onChange={handleSchoolLogoSelect}
              accept="image/*"
              className={`w-full p-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer ${
                schoolLogo ? "bg-green-200" : "bg-red-200"
              }`}
            />
            {!schoolLogo && (
              <div className="text-red-600 text-sm mt-1">
                Select a Logo of ratio[1:1]
              </div>
            )}
          </div>

          <span className="text-2xl font-bold underline col-span-2 rounded-md">
            Students Details
          </span>
          <div className="col-span-2">
            <label className="block mb-1 font-semibold" htmlFor="studentName">
              Name: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={formik.values.studentName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`block w-full rounded-md py-2 px-3.5 shadow-sm border ${
                formik.touched.studentName && formik.errors.studentName
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-gray-500 focus:border-gray-500"
              } focus:outline-none focus:ring-2 focus:ring-opacity-50 sm:text-sm`}
            />
            {formik.touched.studentName && formik.errors.studentName && (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.studentName}
              </div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-semibold" htmlFor="sd_of_mr">
              S/D of Mr.: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="sd_of_mr"
              name="sd_of_mr"
              value={formik.values.sd_of_mr}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {formik.touched.sd_of_mr && formik.errors.sd_of_mr && (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.sd_of_mr}
              </div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-semibold" htmlFor="sd_of_mrs">
              S/D of Mrs.: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="sd_of_mrs"
              name="sd_of_mrs"
              value={formik.values.sd_of_mrs}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {formik.touched.sd_of_mrs && formik.errors.sd_of_mrs && (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.sd_of_mrs}
              </div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-semibold" htmlFor="class">
              Class: <span className="text-red-500">*</span>
            </label>

            <select
              id="class"
              name="class"
              value={formik.values.class}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="">Select Class</option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="V">V</option>
              <option value="VI">VI</option>
              <option value="VII">VII</option>
              <option value="VIII">VIII</option>
              <option value="IX">IX</option>
              <option value="X">X</option>
              <option value="XI">XI</option>
              <option value="XII">XII</option>
            </select>

            {formik.touched.class && formik.errors.class && (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.class}
              </div>
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold" htmlFor="dob">
              Date of Birth: <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formik.values.dob}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {formik.touched.dob && formik.errors.dob && (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.dob}
              </div>
            )}
          </div>
          <div className="col-span-2">
            <label className="block mb-1 font-semibold" htmlFor="address">
              Address: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {formik.touched.address && formik.errors.address && (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.address}
              </div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-semibold" htmlFor="phone">
              Phone No.: <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              maxLength={10}
              min={10}
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.phone}
              </div>
            )}
          </div>
          <div className="">
            <label className="block mb-1 font-semibold" htmlFor="studentPhoto">
              Student Photo:
            </label>
            <input
              type="file"
              id="studentPhoto"
              name="studentPhoto"
              onChange={handleStudentPhotoSelect}
              accept="image/*"
              className={`w-full p-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer ${
                studentPhoto ? "bg-green-200" : "bg-red-200"
              }`}
            />
            {!studentPhoto && (
              <div className="text-red-600 text-sm mt-1">
                Select Student Photo of ratio[1:1]
              </div>
            )}
          </div>

          {error && (
            <div className="text-red-600 text-sm mt-1 text-center col-span-2">
              {error?.response?.data?.message}
            </div>
          )}

          <button
            type="submit"
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md col-span-2 cursor-pointer"
          >
            {" "}
            {isLoading ? "Generating..." : "Generate Card"}
          </button>
        </form>
        <div className="px-4 py-2 rounded-md">
          <h2 className="text-2xl font-bold">Generated ID Card</h2>
          <p>Preview of the generated ID card.</p>
          {/* ID Card preview will go here */}

          <IDCard
            cardInfo={studentsData}
            schoolLogo={schoolLogo}
            studentPhoto={studentPhoto}
          />
        </div>
      </div>
    </div>
  );
};

export default CardGenerator;

import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";
import Company from "../models/Company.js";

const createCompany = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      website,
      description,
      logo,
      linkedin,
      address,
      createdBy,
    } = req.body;
    const { hrName, hrEmail, hrPhone } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !website ||
      !description ||
      !logo ||
      !linkedin ||
      !address ||
      !hrName ||
      !hrEmail ||
      !hrPhone
    ) {
      throw new BadRequestError("Please provide all the required fields");
    }
    // req.body.createdBy = req.user.userId;

    // Create a new HR instance
    const newHr = {
      name: hrName,
      email: hrEmail,
      phone: hrPhone,
    };

    // Save the HR instance to the database
    // const savedHr = await newHr.save();

    // Create a new company instance with the saved HR instance as the HR field
    const newCompany = new Company({
      name,
      email,
      password,
      website,
      description,
      logo,
      linkedin,
      address,
      createdBy,
      hr: newHr,
    });
    // Save the company instance to the database
    const savedCompany = await newCompany.save();

    res.status(StatusCodes.CREATED).json({ savedCompany });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// // Get all companies
// export const getAllCompanies = async (req, res) => {
//   try {
//     const companies = await Company.find().populate("placementDrives");
//     res.status(200).json(companies);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get a single company by ID
// export const getCompanyById = async (req, res) => {
//   try {
//     const company = await Company.findById(req.params.id).populate(
//       "placementDrives"
//     );
//     if (!company) {
//       res.status(404).json({ message: "Company not found" });
//     } else {
//       res.status(200).json(company);
//     }
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Update a company by ID
// export const updateCompanyById = async (req, res) => {
//   try {
//     const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!company) {
//       res.status(404).json({ message: "Company not found" });
//     } else {
//       res.status(200).json(company);
//     }
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete a company by ID
// export const deleteCompanyById = async (req, res) => {
//   try {
//     const company = await Company.findByIdAndDelete(req.params.id);
//     if (!company) {
//       res.status(404).json({ message: "Company not found" });
//     } else {
//       res.status(200).json({ message: "Company deleted successfully" });
//     }
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
export { createCompany };

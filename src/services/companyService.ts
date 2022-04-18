import * as companyRepository from "../repositories/companyRepository.js";

export const findByApiKey = async (apiKey: string) => {
    const company = await companyRepository.findByApiKey(apiKey);

    if (company) return company;

    throw {type: "unauthorized"}
}
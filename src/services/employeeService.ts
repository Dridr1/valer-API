import * as employeeRepository from "../repositories/employeeRepository.js";

export const findById = async(id: number) => {
    const employee = await employeeRepository.findById(id);

    if(employee) return employee;

    throw {type: "not_found"}
}
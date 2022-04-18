import * as cardRepository from "../repositories/cardRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import dayjs from "dayjs";
import bcrypt from "bcrypt";
import { faker } from '@faker-js/faker';

export const create = async (type: string, employee: any) => {
    await uniqueCard(type, employee.id);

    const card: any = formatCard(type, employee);

    const { id } = await cardRepository.insert({ ...card });

    card.id = id;

    if (id) return card;

    throw { type: "conflict" }
}

const uniqueCard = async (type: any, employeeId: number) => {
    const existCard = await cardRepository.findByTypeAndEmployeeId(type, employeeId);

    if (existCard) throw { type: "conflict" }
}

const formatCard = (type: string, employee: any) => {
    const { id, fullName } = employee;

    const card = {
        employeeId: id,
        number: faker.finance.creditCardNumber("mastercard"),
        cardholderName: formatCardHolderName(fullName),
        securityCode: faker.finance.creditCardCVV(),
        expirationDate: dayjs().add(5, "y").format("MM/YY"),
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: true,
        type
    }

    return card;
}

const formatCardHolderName = (name: string) => {
    const nameArr: string[] = name.toUpperCase().split(" ");

    let holderName = "";

    for (let i = 0; i < nameArr.length; i++) {
        if (i > 0) holderName += " ";
        if (i === 0 || i === nameArr.length - 1) holderName += nameArr[i];
        else if (nameArr[i].length > 2) holderName += nameArr[i][0];
    }

    return holderName;
}

export const activateCard = async (securityCode: string, password: string, id: number) => {
    const card = await resgisteredCard(id);

    expirationCard(card.expirationDate);

    isBlocked(card.isBlocked);

    securityCodeVerification(securityCode, card.securityCode);

    card.isBlocked = false;
    card.password = bcrypt.hashSync(password, 10);
    card.originalCardId = id;

    await cardRepository.update(id, card);
}

export const resgisteredCard = async (id: number) => {
    const existCard = await cardRepository.findById(id);

    if (existCard) return existCard;

    throw { type: "not_found" }
}

export const expirationCard = (date: string) => {
    if (dayjs().format("MM/YY") > date) throw { type: "not_found" }
}

const isBlocked = (blocked: boolean) => {
    if (!blocked) throw { type: "conflict" }
}

export const securityCodeVerification = (cvc: string, cvcHash: string) => {
    if (!bcrypt.compareSync(cvc, cvcHash)) throw { type: "unauthorized" }
}

export const balanceCard = async (id: number) => {
    await resgisteredCard(id);
    const recharges = await rechargeRepository.findByCardId(id);
    const transactions = await paymentRepository.findByCardId(id);

    let balance = sumAmount(recharges) - sumAmount(transactions);

    return {
        balance,
        transactions,
        recharges
    }
}

const sumAmount = (list: any[]) => {
    const initial: number = 0;

    return list
        .map(item => item.amount)
        .reduce((sum, currentValue) => sum + currentValue, initial);
}
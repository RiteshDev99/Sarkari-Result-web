import {latestJob} from "./latest-job/latest-job";
import {Admission} from "./admission/admission";
import {AdmitCard} from "./admit-card/admit-card";
import {AnswerKey} from "./answer-key/answer-key";
import {AllResult} from "./result/result";

async function main () {
    // await Admission()
    // await AdmitCard()
    // await AnswerKey()
    // await AllResult()
    await latestJob()
    
}

// main()
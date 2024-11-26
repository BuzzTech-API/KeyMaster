import { Injectable } from "@nestjs/common";

import Cryptr from "cryptr";

@Injectable()
export class PasswordEncryptionService {
    //TODO: Colocar isso aqui no .env
    private masterCryptr: Cryptr = new Cryptr('Chave Super Segura')


    encryptKey(plainKey: string){
        return this.masterCryptr.encrypt(plainKey)
    }
    decryptKey(encryptedKey: string){
        return this.masterCryptr.decrypt(encryptedKey)
    }
    


}
import { Injectable } from "@nestjs/common";

import Cryptr from "cryptr";

@Injectable()
export class PasswordEncryptionService {
    private masterCryptr: Cryptr = new Cryptr('Chave Super Segura')


    async encryptKey(plainKey: string){
        return this.masterCryptr.encrypt(plainKey)
    }
    async decryptKey(encryptedKey: string){
        return this.masterCryptr.decrypt(encryptedKey)
    }
    


}
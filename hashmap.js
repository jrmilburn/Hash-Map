
export default class HashMap{

    constructor(){
        this.buckets = new Array(16).fill(null);
        this.loadFactor = 0.75;
        this.capacity = this.buckets.length;
        this.occupied = 0;
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for(let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode % this.buckets.length;
    }

    set(key, value) {

        if( this.occupied / this.capacity >= this.loadFactor) {
            this.resize();
        }

        const index = this.hash(key);
        if(!this.buckets[index]){
            this.occupied++;
        }

        this.buckets[index] = { key, value };

    }

    resize() {
        const curArray = this.buckets;
        this.capacity *= 2;
        this.buckets = new Array(this.capacity).fill(null);
        
        for (const bucket of curArray) {
            if(bucket){
                this.set(bucket.key, bucket.value);
            }
        }
    }

    get(key) {
        const index = this.hash(key);
        if(this.buckets[index]) {
            for(let i = 0; i < this.buckets[index].length; i++) {
                if(this.buckets[index][i].key === key){
                    return this.buckets[index][i].value;
                }
            }
        }
        return undefined;
    }

    has(key){
        const index = this.hash(key);
        if(this.buckets[index].key === key){
            return true
        } else {
            return false
        }
    }

    remove(key) {
        const index = this.hash(key);
        let bucket = this.buckets[index];
        if(!bucket){
            console.log('No such bucket');
            return false;
        }

        this.buckets[index] = undefined;

        return true;
            
    }

    length() {
        let counter = 0;
        for(let i = 0; i < this.buckets.length; i++){
            if(this.buckets[i]){
                counter++;
            }
        }
        return counter
    }

    clear() {
        for(let i = 0; i < this.buckets.length; i++){
            this.buckets = new Array(16);
        }
    }

    keys() {
        const keys = [];

        for(let i = 0; i < this.buckets.length; i++){
            if(this.buckets[i]){
                keys.push(this.buckets[i][0].key);
            }
        }

        return keys;
    }

    values() {
        const values = [];

        for(let i = 0; i < this.buckets.length; i++){
            if(this.buckets[i]){
                values.push(this.buckets[i][0].value);
            }
        }

        return values;
    }

    entries() {
        const entries = [];

        for(let i = 0; i < this.buckets.length; i++){
            if(this.buckets[i]){
                entries.push(this.buckets[i][0]);
            }
        }

        return entries;
    }
}
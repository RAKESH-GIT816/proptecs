
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'timeconvert',
    pure: true
})
export class TimeconvertPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (value) {
            const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
            if (seconds > 29) {
            const intervals = {
                'year': 31536000,
                'month': 2592000,
                'week': 604800,
                'day': 86400,
                'hr': 3600,
                'min': 60,
                'sec': 1
            };
            let counter;
            for (const i in intervals) {
                counter = Math.floor(seconds / intervals[i]);
                if (counter > 0)
                    if (counter === 1) {
                        return counter + ' ' + i + ' ago'; 
                    } else {
                        return counter + ' ' + i + 's ago'; 
                    }
            }
        }
        else {
            let seconds2 =Math.abs(seconds);
            const intervals = {
                'year': 31536000,
                'month': 2592000,
                'week': 604800,
                'day': 86400,
                'hr': 3600,
                'min': 60,
                'sec': 1
            };
            let counter;
            var array :any= [];
            for (const i in intervals) {
                counter = Math.floor(seconds2 / intervals[i]);
                if (counter > 0)
                   if (counter === 1) {
                        array.push(counter + ' ' + i );
                    
                        switch(i) {
                            case "day":
                                const intervals4 = {
                                    'hr': 3600,
                                    'min': 60,
                                    'sec': 1
                                };
                                let counter4;
                                for (const m in intervals4) {
                                    counter4 = Math.floor(seconds2 / intervals4[m]);
                                    if (counter4 > 0)
                                        var arryval=Math.floor(counter4-(counter*12));
                                        array.push(arryval + ' ' + m );
                                        return array + ' to go'; 
                                        
                                    }
                            
                            break;
                            
                            case "hr":
                                const intervals5 = {
                                    'min': 60,
                                    'sec': 1
                                };
                                let counter5;
                                for (const n in intervals5) {
                                    counter5 = Math.floor(seconds2 / intervals5[n]);
                                    if (counter5 > 0)
                                            var arryval=Math.floor(counter5-(counter*60));
                                            array.push(arryval + ' ' + n );
                                            return array + ' to go'; 
                                            
                                        
                                    }
                            
                            break;

                            default :
                                return array + ' to go'; 
                            
                           
                        }
                       
                    } 
                    else {
                        array.push(counter + ' ' + i );
                        switch(i) {
                            case "day":
                                const intervals4 = {
                                    'hr': 3600,
                                    'min': 60,
                                    'sec': 1
                                };
                                let counter4;
                                for (const m in intervals4) {
                                    counter4 = Math.floor(seconds2 / intervals4[m]);
                                    if (counter4 > 0)
                                            var arryval=Math.floor(counter4-(counter*24));
                                            array.push(arryval + ' ' + m );
                                            return array + 's to go';
                                    }
                            
                            break;
                            
                            case "hr":
                          
                                const intervals5 = {
                                    'min': 60,
                                    'sec': 1
                                };
                                let counter5;
                                for (const n in intervals5) {
                                    counter5 = Math.floor(seconds2 / intervals5[n]);
                                    if (counter5 > 0)
                                            var arryval=Math.floor(counter5-(counter*60));
                                            array.push(arryval + ' ' + n );
                                            return array + 's to go'; 
                                    }
                            
                            break;

                            default :
                                return array + 's to go'; 
                            
                           
                        }
                    }
            }
        }
        }
        return value;
    }

}

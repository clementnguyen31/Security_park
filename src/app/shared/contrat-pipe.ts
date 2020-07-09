import { Pipe, PipeTransform } from '@angular/core';
import { Contrats } from './contrats.model';

@Pipe({
    name: 'contratfiltre',
    pure: false
})

export class ContratPipe implements PipeTransform {
    transform(items: any[], filter: Contrats) {
        return items.filter(item => item.EtatContrat.indexOf(filter.EtatContrat) !== -1);
    }
}

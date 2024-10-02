import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pessoa } from '../../modelo/Pessoa';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 
  // Objeto de formulário
  formulario = new FormGroup({
    nome : new FormControl('', [Validators.required, Validators.minLength(3)]),
    idade : new FormControl(null, [Validators.required, Validators.min(0), Validators.max(120)]),
    cidade : new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  // Visibilidade dos botões
  btnCadastrar: boolean = true;

  // Armazenar índice da pessoa selecionada
  indice:number = -1; // -1 garante que nenhuma pessoa está selecionada

  // Vetor
  vetor: Pessoa[] = [];

  // Função Cadastro
  cadastrar(){
    // Cadastro no vetor
    this.vetor.push(this.formulario.value as Pessoa);
    // Limpeza dos inputs
    this.formulario.reset();

    // Visualização via console
    //console.table(this.vetor);
  }

  // Função de Seleção
  selecionar(indice:number){
    // Atribuir índice da pessoas
    this.indice = indice;

    // Atribuir os dados da pessoa no formulário
    this.formulario.setValue({
      nome : this.vetor[indice].nome,
      idade : this.vetor[indice].idade,
      cidade : this.vetor[indice].cidade
    });

    // Visibilidade dos botões
    this.btnCadastrar = false;

  }

  // Função de Alteração
  alterar(){
    // Alterar vetor
    this.vetor[this.indice] = this.formulario.value as Pessoa;

    // Limpar os inputs
    this.formulario.reset();

    // Visibilidade dos botões
    this.btnCadastrar = true;
  }

  // Função de Remoção
  remover() {
    // Removendo pessoa do vetor
    this.vetor.splice(this.indice, 1); // posição inicial da remoção dos dados, quantas infos a partir deste indice serão removidas

    // Limpeza dos inputs
    this.formulario.reset();

    // Visibilidade dos botões
    this.btnCadastrar = true;
  }

  // Função de Cancelamento
  cancelar() {
    // Limpeza dos inputs
    this.formulario.reset();

    // Visibilidade dos botões
    this.btnCadastrar = true;
  }

}

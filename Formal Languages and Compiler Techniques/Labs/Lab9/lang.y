%token SPATIU;
%token SARILINIA;
%token GATALINIA;
%token PUNCTVIRGULA;
%token DOUAPUNCTE;
%token PUNCT;
%token VIRGULA;
%token PARANTEZADESCHISA;
%token PARANTEZAINCHISA;
%token ACOLADADESCHISA;
%token ACOLADAINCHISA;
%token PARANTEZAPATRATADESCHISA;
%token PARANTEZAPATRATAINCHISA;
%token LINIESUBTIRE;

%token IDENTIFIER;
%token INTCONSTANT;
%token STRINGCONSTANT;

%{
#include "lexer.h"
#include <stdio.h>
#include <stdlib.h>

#define YYDEBUG 1

int yyerror(const char *s);
%}

%token PROG;
%token CVNOU;
%token DACA;
%token ALTFEL;
%token CATTIMP;
%token FA;
%token PENTRU;
%token PENTRUFIECARE;
%token OPRESTETE;
%token CONTINUA;
%token SCRIE;
%token CITESTE;
%token IN;
%token DE;
%token ATUNCI;
%token INCEPE;
%token TERMINA;
%token INTREG;
%token REAL;
%token SFOARA;
%token SIR;
%token CONSTANT;
%token FUNCTIE;
%token INTOARCE;
%token ADVFALS;
%token CARACTER;
%token RADICAL;
%token SISI;
%token SAUSAU;
%token NU;

%token ADUNATE;
%token STERGETE;
%token ORIORI;
%token ORIORIINVERS;
%token ESTIEGAL;
%token VERIFICAEGAL;
%token VERIFICANUEGAL;
%token MAIMARE;
%token MAIMIC;
%token MAIMAREEGAL;
%token MAIMICEGAL;
%token LASUTA;

%start program

%%

program : PROG ACOLADADESCHISA stmtlist ACOLADAINCHISA { printf("program -> prog { stmtlist }\n"); }
        ;

stmtlist : stmtlist stmt PUNCTVIRGULA  { printf("stmtlist -> stmtlist stmt ;\n"); }
         | stmtlist stmt               { printf("stmtlist -> stmtlist stmt\n"); }
         | /* empty */                 { printf("stmtlist -> empty\n"); }
         ;

stmt : simplstmt PUNCTVIRGULA           { printf("stmt -> simplstmt ;\n"); }
     | structstmt                       { printf("stmt -> structstmt\n"); }
     ;

simplstmt : declaration     { printf("simplstmt -> declaration\n"); }
          | assignstmt      { printf("simplstmt -> assignstmt\n"); }
          | iostmt          { printf("simplstmt -> iostmt\n"); }
          | radstmt         { printf("simplstmt -> radstmt\n"); }
          ;

declaration : CVNOU IDENTIFIER DOUAPUNCTE type { printf("declaration -> cvnou identifier : type\n"); }
            ;

type : type1               { printf("type -> type1\n"); }
     | arraydecl           { printf("type -> arraydecl\n"); }
     ;

type1 : INTREG             { printf("type1 -> intreg\n"); }
      | REAL               { printf("type1 -> real\n"); }
      | SFOARA             { printf("type1 -> sfoara\n"); }
      | CARACTER           { printf("type1 -> caracter\n"); }
      | ADVFALS            { printf("type1 -> advfals\n"); }
      ;

arraydecl : SIR PARANTEZADESCHISA INTCONSTANT PARANTEZAINCHISA DE type1 { printf("arraydecl -> sir parantezadeschisa intconstant parantezainchisa de type1\n"); }
          ;

assignstmt : IDENTIFIER ESTIEGAL expression { printf("assignstmt -> identifier estiegal expression\n"); }
           ;

operator : ADUNATE           { printf("operator -> adunate\n"); }
         | STERGETE          { printf("operator -> stergete\n"); }
         | ORIORI            { printf("operator -> oriori\n"); }
         | ORIORIINVERS      { printf("operator -> orioriinvers\n"); }
         | LASUTA            { printf("operator -> lasuta\n"); }
         ;

expression : term                         { printf("expression -> term\n"); }
           | term operator expression     { printf("expression -> term operator expression\n"); }
           ;

term : IDENTIFIER            { printf("term -> identifier\n"); }
     | INTCONSTANT           { printf("term -> intconstant\n"); }
     | factor                { printf("term -> factor\n"); }
     ;

factor : STERGETE IDENTIFIER                                                        { printf("factor -> stergete identifier\n"); }
       | STERGETE INTCONSTANT                                                       { printf("factor -> stergete intconstant\n"); }
       | radstmt                                                                    { printf("factor -> radstmt\n"); }
       | IDENTIFIER PARANTEZAPATRATADESCHISA IDENTIFIER PARANTEZAPATRATAINCHISA     { printf("factor -> identifier [ identifier ]\n"); }
       | IDENTIFIER PARANTEZAPATRATADESCHISA INTCONSTANT PARANTEZAPATRATAINCHISA    { printf("factor -> identifier [ intconstant ]\n"); }
       | PARANTEZADESCHISA expression PARANTEZAINCHISA                              { printf("factor -> ( expression )\n"); }
       ;

iostmt : CITESTE PARANTEZADESCHISA IDENTIFIER PARANTEZAINCHISA       { printf("iostmt -> citeste ( identifier )\n"); }
       | SCRIE PARANTEZADESCHISA IDENTIFIER PARANTEZAINCHISA         { printf("iostmt -> scrie ( identifier )\n"); }
       | SCRIE PARANTEZADESCHISA INTCONSTANT PARANTEZAINCHISA        { printf("iostmt -> scrie ( intconstant )\n"); }
       | SCRIE PARANTEZADESCHISA STRINGCONSTANT PARANTEZAINCHISA     { printf("iostmt -> scrie ( stringconstant )\n"); }
       ;

radstmt : RADICAL PARANTEZADESCHISA IDENTIFIER PARANTEZAINCHISA        { printf("radstmt -> radical ( identifier )\n"); }
        ;

structstmt : ifstmt           { printf("structstmt -> daca\n"); }
           | whilestmt        { printf("structstmt -> cattimp\n"); }
           | foreachstmt      { printf("structstmt -> pentrufiecare\n"); }
           | forstmt          { printf("structstmt -> pentru\n"); }
           ;

ifstmt : DACA PARANTEZADESCHISA condition PARANTEZAINCHISA ATUNCI ACOLADADESCHISA stmtlist ACOLADAINCHISA                                                   { printf("ifstmt -> daca parantezadeschisa condition parantezainchisa atunci acoladadeschisa stmtlist acoladainchisa\n"); }
       | DACA PARANTEZADESCHISA condition PARANTEZAINCHISA ATUNCI ACOLADADESCHISA stmtlist ACOLADAINCHISA ALTFEL ACOLADADESCHISA stmtlist ACOLADAINCHISA    { printf("ifstmt -> daca parantezadeschisa condition parantezainchisa atunci acoladadeschisa stmtlist acoladainchisa altfel acoladadeschisa stmtlist acoladainchisa\n"); }
       ;

condition : expression relation expression                        { printf("condition -> expression relation expression\n"); }
          | expression relation expression SISI condition         { printf("condition -> expression relation expression sisi condition\n"); }
          | expression relation expression SAUSAU condition       { printf("condition -> expression relation expression sausau condition\n"); }
          ;

relation : MAIMAREEGAL          { printf("relation -> maimareegal\n"); }
         | MAIMICEGAL           { printf("relation -> maimicegal\n"); }
         | MAIMARE              { printf("relation -> maimare\n"); }
         | MAIMIC               { printf("relation -> maimic\n"); }
         | VERIFICAEGAL         { printf("relation -> verificaegal\n"); }
         | ESTIEGAL             { printf("relation -> estiegal\n"); }
         | VERIFICANUEGAL       { printf("relation -> verificanuegal\n"); }
         ;

whilestmt : CATTIMP PARANTEZADESCHISA condition PARANTEZAINCHISA FA ACOLADADESCHISA stmtlist ACOLADAINCHISA { printf("whilestmt -> cattimp parantezadeschisa condition parantezainchisa fa acoladadeschisa stmtlist acoladainchisa\n"); }
          ;

forstmt : PENTRU PARANTEZADESCHISA assignstmt PUNCTVIRGULA condition PUNCTVIRGULA assignstmt PARANTEZAINCHISA FA ACOLADADESCHISA stmtlist ACOLADAINCHISA { printf("forstmt -> pentru parantezadeschisa assignstmt ; condition ; assignstmt parantezainchisa fa acoladadeschisa stmtlist acoladainchisa\n"); }
        ;

foreachstmt : PENTRUFIECARE PARANTEZADESCHISA IDENTIFIER IN IDENTIFIER PARANTEZAINCHISA FA ACOLADADESCHISA stmtlist ACOLADAINCHISA { printf("foreachstmt -> pentrufiecare parantezadeschisa identifier in identifier parantezainchisa fa acoladadeschisa stmtlist acoladainchisa\n"); }
            ;

%%

int yyerror(const char *s) {
    printf("%s\n",s);
    return 0;
}

extern FILE *yyin;

int main(int argc, char** argv) {
    if (argc > 1)
        yyin = fopen(argv[1], "r");
    if (!yyparse())
        fprintf(stderr, "\tOK\n");
}
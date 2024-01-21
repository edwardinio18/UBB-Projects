/* A Bison parser, made by GNU Bison 2.3.  */

/* Skeleton implementation for Bison's Yacc-like parsers in C

   Copyright (C) 1984, 1989, 1990, 2000, 2001, 2002, 2003, 2004, 2005, 2006
   Free Software Foundation, Inc.

   This program is free software; you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation; either version 2, or (at your option)
   any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program; if not, write to the Free Software
   Foundation, Inc., 51 Franklin Street, Fifth Floor,
   Boston, MA 02110-1301, USA.  */

/* As a special exception, you may create a larger work that contains
   part or all of the Bison parser skeleton and distribute that work
   under terms of your choice, so long as that work isn't itself a
   parser generator using the skeleton or a modified version thereof
   as a parser skeleton.  Alternatively, if you modify or redistribute
   the parser skeleton itself, you may (at your option) remove this
   special exception, which will cause the skeleton and the resulting
   Bison output files to be licensed under the GNU General Public
   License without this special exception.

   This special exception was added by the Free Software Foundation in
   version 2.2 of Bison.  */

/* C LALR(1) parser skeleton written by Richard Stallman, by
   simplifying the original so-called "semantic" parser.  */

/* All symbols defined below should begin with yy or YY, to avoid
   infringing on user name space.  This should be done even for local
   variables, as they might otherwise be expanded by user macros.
   There are some unavoidable exceptions within include files to
   define necessary library symbols; they are noted "INFRINGES ON
   USER NAME SPACE" below.  */

/* Identify Bison output.  */
#define YYBISON 1

/* Bison version.  */
#define YYBISON_VERSION "2.3"

/* Skeleton name.  */
#define YYSKELETON_NAME "yacc.c"

/* Pure parsers.  */
#define YYPURE 0

/* Using locations.  */
#define YYLSP_NEEDED 0



/* Tokens.  */
#ifndef YYTOKENTYPE
# define YYTOKENTYPE
   /* Put the tokens into the symbol table, so that GDB and other debuggers
      know about them.  */
   enum yytokentype {
     SPATIU = 258,
     SARILINIA = 259,
     GATALINIA = 260,
     PUNCTVIRGULA = 261,
     DOUAPUNCTE = 262,
     PUNCT = 263,
     VIRGULA = 264,
     PARANTEZADESCHISA = 265,
     PARANTEZAINCHISA = 266,
     ACOLADADESCHISA = 267,
     ACOLADAINCHISA = 268,
     PARANTEZAPATRATADESCHISA = 269,
     PARANTEZAPATRATAINCHISA = 270,
     LINIESUBTIRE = 271,
     IDENTIFIER = 272,
     INTCONSTANT = 273,
     STRINGCONSTANT = 274,
     PROG = 275,
     CVNOU = 276,
     DACA = 277,
     ALTFEL = 278,
     CATTIMP = 279,
     FA = 280,
     PENTRU = 281,
     PENTRUFIECARE = 282,
     OPRESTETE = 283,
     CONTINUA = 284,
     SCRIE = 285,
     CITESTE = 286,
     IN = 287,
     DE = 288,
     ATUNCI = 289,
     INCEPE = 290,
     TERMINA = 291,
     INTREG = 292,
     REAL = 293,
     SFOARA = 294,
     SIR = 295,
     CONSTANT = 296,
     FUNCTIE = 297,
     INTOARCE = 298,
     ADVFALS = 299,
     CARACTER = 300,
     RADICAL = 301,
     SISI = 302,
     SAUSAU = 303,
     NU = 304,
     ADUNATE = 305,
     STERGETE = 306,
     ORIORI = 307,
     ORIORIINVERS = 308,
     ESTIEGAL = 309,
     VERIFICAEGAL = 310,
     VERIFICANUEGAL = 311,
     MAIMARE = 312,
     MAIMIC = 313,
     MAIMAREEGAL = 314,
     MAIMICEGAL = 315,
     LASUTA = 316
   };
#endif
/* Tokens.  */
#define SPATIU 258
#define SARILINIA 259
#define GATALINIA 260
#define PUNCTVIRGULA 261
#define DOUAPUNCTE 262
#define PUNCT 263
#define VIRGULA 264
#define PARANTEZADESCHISA 265
#define PARANTEZAINCHISA 266
#define ACOLADADESCHISA 267
#define ACOLADAINCHISA 268
#define PARANTEZAPATRATADESCHISA 269
#define PARANTEZAPATRATAINCHISA 270
#define LINIESUBTIRE 271
#define IDENTIFIER 272
#define INTCONSTANT 273
#define STRINGCONSTANT 274
#define PROG 275
#define CVNOU 276
#define DACA 277
#define ALTFEL 278
#define CATTIMP 279
#define FA 280
#define PENTRU 281
#define PENTRUFIECARE 282
#define OPRESTETE 283
#define CONTINUA 284
#define SCRIE 285
#define CITESTE 286
#define IN 287
#define DE 288
#define ATUNCI 289
#define INCEPE 290
#define TERMINA 291
#define INTREG 292
#define REAL 293
#define SFOARA 294
#define SIR 295
#define CONSTANT 296
#define FUNCTIE 297
#define INTOARCE 298
#define ADVFALS 299
#define CARACTER 300
#define RADICAL 301
#define SISI 302
#define SAUSAU 303
#define NU 304
#define ADUNATE 305
#define STERGETE 306
#define ORIORI 307
#define ORIORIINVERS 308
#define ESTIEGAL 309
#define VERIFICAEGAL 310
#define VERIFICANUEGAL 311
#define MAIMARE 312
#define MAIMIC 313
#define MAIMAREEGAL 314
#define MAIMICEGAL 315
#define LASUTA 316




/* Copy the first part of user declarations.  */
#line 20 "lang.y"

#include "lexer.h"
#include <stdio.h>
#include <stdlib.h>

#define YYDEBUG 1

int yyerror(const char *s);


/* Enabling traces.  */
#ifndef YYDEBUG
# define YYDEBUG 0
#endif

/* Enabling verbose error messages.  */
#ifdef YYERROR_VERBOSE
# undef YYERROR_VERBOSE
# define YYERROR_VERBOSE 1
#else
# define YYERROR_VERBOSE 0
#endif

/* Enabling the token table.  */
#ifndef YYTOKEN_TABLE
# define YYTOKEN_TABLE 0
#endif

#if ! defined YYSTYPE && ! defined YYSTYPE_IS_DECLARED
typedef int YYSTYPE;
# define yystype YYSTYPE /* obsolescent; will be withdrawn */
# define YYSTYPE_IS_DECLARED 1
# define YYSTYPE_IS_TRIVIAL 1
#endif



/* Copy the second part of user declarations.  */


/* Line 216 of yacc.c.  */
#line 238 "lang.tab.c"

#ifdef short
# undef short
#endif

#ifdef YYTYPE_UINT8
typedef YYTYPE_UINT8 yytype_uint8;
#else
typedef unsigned char yytype_uint8;
#endif

#ifdef YYTYPE_INT8
typedef YYTYPE_INT8 yytype_int8;
#elif (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
typedef signed char yytype_int8;
#else
typedef short int yytype_int8;
#endif

#ifdef YYTYPE_UINT16
typedef YYTYPE_UINT16 yytype_uint16;
#else
typedef unsigned short int yytype_uint16;
#endif

#ifdef YYTYPE_INT16
typedef YYTYPE_INT16 yytype_int16;
#else
typedef short int yytype_int16;
#endif

#ifndef YYSIZE_T
# ifdef __SIZE_TYPE__
#  define YYSIZE_T __SIZE_TYPE__
# elif defined size_t
#  define YYSIZE_T size_t
# elif ! defined YYSIZE_T && (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
#  include <stddef.h> /* INFRINGES ON USER NAME SPACE */
#  define YYSIZE_T size_t
# else
#  define YYSIZE_T unsigned int
# endif
#endif

#define YYSIZE_MAXIMUM ((YYSIZE_T) -1)

#ifndef YY_
# if defined YYENABLE_NLS && YYENABLE_NLS
#  if ENABLE_NLS
#   include <libintl.h> /* INFRINGES ON USER NAME SPACE */
#   define YY_(msgid) dgettext ("bison-runtime", msgid)
#  endif
# endif
# ifndef YY_
#  define YY_(msgid) msgid
# endif
#endif

/* Suppress unused-variable warnings by "using" E.  */
#if ! defined lint || defined __GNUC__
# define YYUSE(e) ((void) (e))
#else
# define YYUSE(e) /* empty */
#endif

/* Identity function, used to suppress warnings about constant conditions.  */
#ifndef lint
# define YYID(n) (n)
#else
#if (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
static int
YYID (int i)
#else
static int
YYID (i)
    int i;
#endif
{
  return i;
}
#endif

#if ! defined yyoverflow || YYERROR_VERBOSE

/* The parser invokes alloca or malloc; define the necessary symbols.  */

# ifdef YYSTACK_USE_ALLOCA
#  if YYSTACK_USE_ALLOCA
#   ifdef __GNUC__
#    define YYSTACK_ALLOC __builtin_alloca
#   elif defined __BUILTIN_VA_ARG_INCR
#    include <alloca.h> /* INFRINGES ON USER NAME SPACE */
#   elif defined _AIX
#    define YYSTACK_ALLOC __alloca
#   elif defined _MSC_VER
#    include <malloc.h> /* INFRINGES ON USER NAME SPACE */
#    define alloca _alloca
#   else
#    define YYSTACK_ALLOC alloca
#    if ! defined _ALLOCA_H && ! defined _STDLIB_H && (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
#     include <stdlib.h> /* INFRINGES ON USER NAME SPACE */
#     ifndef _STDLIB_H
#      define _STDLIB_H 1
#     endif
#    endif
#   endif
#  endif
# endif

# ifdef YYSTACK_ALLOC
   /* Pacify GCC's `empty if-body' warning.  */
#  define YYSTACK_FREE(Ptr) do { /* empty */; } while (YYID (0))
#  ifndef YYSTACK_ALLOC_MAXIMUM
    /* The OS might guarantee only one guard page at the bottom of the stack,
       and a page size can be as small as 4096 bytes.  So we cannot safely
       invoke alloca (N) if N exceeds 4096.  Use a slightly smaller number
       to allow for a few compiler-allocated temporary stack slots.  */
#   define YYSTACK_ALLOC_MAXIMUM 4032 /* reasonable circa 2006 */
#  endif
# else
#  define YYSTACK_ALLOC YYMALLOC
#  define YYSTACK_FREE YYFREE
#  ifndef YYSTACK_ALLOC_MAXIMUM
#   define YYSTACK_ALLOC_MAXIMUM YYSIZE_MAXIMUM
#  endif
#  if (defined __cplusplus && ! defined _STDLIB_H \
       && ! ((defined YYMALLOC || defined malloc) \
	     && (defined YYFREE || defined free)))
#   include <stdlib.h> /* INFRINGES ON USER NAME SPACE */
#   ifndef _STDLIB_H
#    define _STDLIB_H 1
#   endif
#  endif
#  ifndef YYMALLOC
#   define YYMALLOC malloc
#   if ! defined malloc && ! defined _STDLIB_H && (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
void *malloc (YYSIZE_T); /* INFRINGES ON USER NAME SPACE */
#   endif
#  endif
#  ifndef YYFREE
#   define YYFREE free
#   if ! defined free && ! defined _STDLIB_H && (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
void free (void *); /* INFRINGES ON USER NAME SPACE */
#   endif
#  endif
# endif
#endif /* ! defined yyoverflow || YYERROR_VERBOSE */


#if (! defined yyoverflow \
     && (! defined __cplusplus \
	 || (defined YYSTYPE_IS_TRIVIAL && YYSTYPE_IS_TRIVIAL)))

/* A type that is properly aligned for any stack member.  */
union yyalloc
{
  yytype_int16 yyss;
  YYSTYPE yyvs;
  };

/* The size of the maximum gap between one aligned stack and the next.  */
# define YYSTACK_GAP_MAXIMUM (sizeof (union yyalloc) - 1)

/* The size of an array large to enough to hold all stacks, each with
   N elements.  */
# define YYSTACK_BYTES(N) \
     ((N) * (sizeof (yytype_int16) + sizeof (YYSTYPE)) \
      + YYSTACK_GAP_MAXIMUM)

/* Copy COUNT objects from FROM to TO.  The source and destination do
   not overlap.  */
# ifndef YYCOPY
#  if defined __GNUC__ && 1 < __GNUC__
#   define YYCOPY(To, From, Count) \
      __builtin_memcpy (To, From, (Count) * sizeof (*(From)))
#  else
#   define YYCOPY(To, From, Count)		\
      do					\
	{					\
	  YYSIZE_T yyi;				\
	  for (yyi = 0; yyi < (Count); yyi++)	\
	    (To)[yyi] = (From)[yyi];		\
	}					\
      while (YYID (0))
#  endif
# endif

/* Relocate STACK from its old location to the new one.  The
   local variables YYSIZE and YYSTACKSIZE give the old and new number of
   elements in the stack, and YYPTR gives the new location of the
   stack.  Advance YYPTR to a properly aligned location for the next
   stack.  */
# define YYSTACK_RELOCATE(Stack)					\
    do									\
      {									\
	YYSIZE_T yynewbytes;						\
	YYCOPY (&yyptr->Stack, Stack, yysize);				\
	Stack = &yyptr->Stack;						\
	yynewbytes = yystacksize * sizeof (*Stack) + YYSTACK_GAP_MAXIMUM; \
	yyptr += yynewbytes / sizeof (*yyptr);				\
      }									\
    while (YYID (0))

#endif

/* YYFINAL -- State number of the termination state.  */
#define YYFINAL  4
/* YYLAST -- Last index in YYTABLE.  */
#define YYLAST   168

/* YYNTOKENS -- Number of terminals.  */
#define YYNTOKENS  62
/* YYNNTS -- Number of nonterminals.  */
#define YYNNTS  23
/* YYNRULES -- Number of rules.  */
#define YYNRULES  61
/* YYNRULES -- Number of states.  */
#define YYNSTATES  135

/* YYTRANSLATE(YYLEX) -- Bison symbol number corresponding to YYLEX.  */
#define YYUNDEFTOK  2
#define YYMAXUTOK   316

#define YYTRANSLATE(YYX)						\
  ((unsigned int) (YYX) <= YYMAXUTOK ? yytranslate[YYX] : YYUNDEFTOK)

/* YYTRANSLATE[YYLEX] -- Bison symbol number corresponding to YYLEX.  */
static const yytype_uint8 yytranslate[] =
{
       0,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     1,     2,     3,     4,
       5,     6,     7,     8,     9,    10,    11,    12,    13,    14,
      15,    16,    17,    18,    19,    20,    21,    22,    23,    24,
      25,    26,    27,    28,    29,    30,    31,    32,    33,    34,
      35,    36,    37,    38,    39,    40,    41,    42,    43,    44,
      45,    46,    47,    48,    49,    50,    51,    52,    53,    54,
      55,    56,    57,    58,    59,    60,    61
};

#if YYDEBUG
/* YYPRHS[YYN] -- Index of the first RHS symbol of rule number YYN in
   YYRHS.  */
static const yytype_uint8 yyprhs[] =
{
       0,     0,     3,     8,    12,    15,    16,    19,    21,    23,
      25,    27,    29,    34,    36,    38,    40,    42,    44,    46,
      48,    55,    59,    61,    63,    65,    67,    69,    71,    75,
      77,    79,    81,    84,    87,    89,    94,    99,   103,   108,
     113,   118,   123,   128,   130,   132,   134,   136,   145,   158,
     162,   168,   174,   176,   178,   180,   182,   184,   186,   188,
     197,   210
};

/* YYRHS -- A `-1'-separated list of the rules' RHS.  */
static const yytype_int8 yyrhs[] =
{
      63,     0,    -1,    20,    12,    64,    13,    -1,    64,    65,
       6,    -1,    64,    65,    -1,    -1,    66,     6,    -1,    78,
      -1,    67,    -1,    71,    -1,    76,    -1,    77,    -1,    21,
      17,     7,    68,    -1,    69,    -1,    70,    -1,    37,    -1,
      38,    -1,    39,    -1,    45,    -1,    44,    -1,    40,    10,
      18,    11,    33,    69,    -1,    17,    54,    73,    -1,    50,
      -1,    51,    -1,    52,    -1,    53,    -1,    61,    -1,    74,
      -1,    74,    72,    73,    -1,    17,    -1,    18,    -1,    75,
      -1,    51,    17,    -1,    51,    18,    -1,    77,    -1,    17,
      14,    17,    15,    -1,    17,    14,    18,    15,    -1,    10,
      73,    11,    -1,    31,    10,    17,    11,    -1,    30,    10,
      17,    11,    -1,    30,    10,    18,    11,    -1,    30,    10,
      19,    11,    -1,    46,    10,    17,    11,    -1,    79,    -1,
      82,    -1,    84,    -1,    83,    -1,    22,    10,    80,    11,
      34,    12,    64,    13,    -1,    22,    10,    80,    11,    34,
      12,    64,    13,    23,    12,    64,    13,    -1,    73,    81,
      73,    -1,    73,    81,    73,    47,    80,    -1,    73,    81,
      73,    48,    80,    -1,    59,    -1,    60,    -1,    57,    -1,
      58,    -1,    55,    -1,    54,    -1,    56,    -1,    24,    10,
      80,    11,    25,    12,    64,    13,    -1,    26,    10,    71,
       6,    80,     6,    71,    11,    25,    12,    64,    13,    -1,
      27,    10,    17,    32,    17,    11,    25,    12,    64,    13,
      -1
};

/* YYRLINE[YYN] -- source line where rule number YYN was defined.  */
static const yytype_uint8 yyrline[] =
{
       0,    78,    78,    81,    82,    83,    86,    87,    90,    91,
      92,    93,    96,    99,   100,   103,   104,   105,   106,   107,
     110,   113,   116,   117,   118,   119,   120,   123,   124,   127,
     128,   129,   132,   133,   134,   135,   136,   137,   140,   141,
     142,   143,   146,   149,   150,   151,   152,   155,   156,   159,
     160,   161,   164,   165,   166,   167,   168,   169,   170,   173,
     176,   179
};
#endif

#if YYDEBUG || YYERROR_VERBOSE || YYTOKEN_TABLE
/* YYTNAME[SYMBOL-NUM] -- String name of the symbol SYMBOL-NUM.
   First, the terminals, then, starting at YYNTOKENS, nonterminals.  */
static const char *const yytname[] =
{
  "$end", "error", "$undefined", "SPATIU", "SARILINIA", "GATALINIA",
  "PUNCTVIRGULA", "DOUAPUNCTE", "PUNCT", "VIRGULA", "PARANTEZADESCHISA",
  "PARANTEZAINCHISA", "ACOLADADESCHISA", "ACOLADAINCHISA",
  "PARANTEZAPATRATADESCHISA", "PARANTEZAPATRATAINCHISA", "LINIESUBTIRE",
  "IDENTIFIER", "INTCONSTANT", "STRINGCONSTANT", "PROG", "CVNOU", "DACA",
  "ALTFEL", "CATTIMP", "FA", "PENTRU", "PENTRUFIECARE", "OPRESTETE",
  "CONTINUA", "SCRIE", "CITESTE", "IN", "DE", "ATUNCI", "INCEPE",
  "TERMINA", "INTREG", "REAL", "SFOARA", "SIR", "CONSTANT", "FUNCTIE",
  "INTOARCE", "ADVFALS", "CARACTER", "RADICAL", "SISI", "SAUSAU", "NU",
  "ADUNATE", "STERGETE", "ORIORI", "ORIORIINVERS", "ESTIEGAL",
  "VERIFICAEGAL", "VERIFICANUEGAL", "MAIMARE", "MAIMIC", "MAIMAREEGAL",
  "MAIMICEGAL", "LASUTA", "$accept", "program", "stmtlist", "stmt",
  "simplstmt", "declaration", "type", "type1", "arraydecl", "assignstmt",
  "operator", "expression", "term", "factor", "iostmt", "radstmt",
  "structstmt", "ifstmt", "condition", "relation", "whilestmt", "forstmt",
  "foreachstmt", 0
};
#endif

# ifdef YYPRINT
/* YYTOKNUM[YYLEX-NUM] -- Internal token number corresponding to
   token YYLEX-NUM.  */
static const yytype_uint16 yytoknum[] =
{
       0,   256,   257,   258,   259,   260,   261,   262,   263,   264,
     265,   266,   267,   268,   269,   270,   271,   272,   273,   274,
     275,   276,   277,   278,   279,   280,   281,   282,   283,   284,
     285,   286,   287,   288,   289,   290,   291,   292,   293,   294,
     295,   296,   297,   298,   299,   300,   301,   302,   303,   304,
     305,   306,   307,   308,   309,   310,   311,   312,   313,   314,
     315,   316
};
# endif

/* YYR1[YYN] -- Symbol number of symbol that rule YYN derives.  */
static const yytype_uint8 yyr1[] =
{
       0,    62,    63,    64,    64,    64,    65,    65,    66,    66,
      66,    66,    67,    68,    68,    69,    69,    69,    69,    69,
      70,    71,    72,    72,    72,    72,    72,    73,    73,    74,
      74,    74,    75,    75,    75,    75,    75,    75,    76,    76,
      76,    76,    77,    78,    78,    78,    78,    79,    79,    80,
      80,    80,    81,    81,    81,    81,    81,    81,    81,    82,
      83,    84
};

/* YYR2[YYN] -- Number of symbols composing right hand side of rule YYN.  */
static const yytype_uint8 yyr2[] =
{
       0,     2,     4,     3,     2,     0,     2,     1,     1,     1,
       1,     1,     4,     1,     1,     1,     1,     1,     1,     1,
       6,     3,     1,     1,     1,     1,     1,     1,     3,     1,
       1,     1,     2,     2,     1,     4,     4,     3,     4,     4,
       4,     4,     4,     1,     1,     1,     1,     8,    12,     3,
       5,     5,     1,     1,     1,     1,     1,     1,     1,     8,
      12,    10
};

/* YYDEFACT[STATE-NAME] -- Default rule to reduce with in state
   STATE-NUM when YYTABLE doesn't specify something else to do.  Zero
   means the default is an error.  */
static const yytype_uint8 yydefact[] =
{
       0,     0,     0,     5,     1,     0,     2,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     4,     0,     8,     9,
      10,    11,     7,    43,    44,    46,    45,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     3,     6,     0,    29,
      30,     0,    21,    27,    31,    34,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,    32,
      33,    22,    23,    24,    25,    26,     0,    15,    16,    17,
       0,    19,    18,    12,    13,    14,    57,    56,    58,    54,
      55,    52,    53,     0,     0,     0,     0,     0,    39,    40,
      41,    38,    42,    37,     0,     0,    28,     0,    49,     0,
       0,     0,     0,    35,    36,     0,     0,     0,     5,     5,
       0,     0,     0,    50,    51,     0,     0,     0,     0,     0,
      47,    59,     0,     5,    20,     0,     0,     0,     5,     5,
      61,     0,     0,    48,    60
};

/* YYDEFGOTO[NTERM-NUM].  */
static const yytype_int8 yydefgoto[] =
{
      -1,     2,     5,    16,    17,    18,    73,    74,    75,    19,
      66,    47,    43,    44,    20,    45,    22,    23,    48,    83,
      24,    25,    26
};

/* YYPACT[STATE-NUM] -- Index in YYTABLE of the portion describing
   STATE-NUM.  */
#define YYPACT_NINF -101
static const yytype_int16 yypact[] =
{
       5,     8,    10,  -101,  -101,     0,  -101,   -22,    24,    39,
      41,    44,    45,    54,    55,    56,    63,    64,  -101,  -101,
    -101,  -101,  -101,  -101,  -101,  -101,  -101,    -6,    67,    -6,
      -6,    58,    59,   -12,    66,    71,  -101,  -101,    -6,    57,
    -101,    -2,  -101,   -17,  -101,  -101,    23,   100,    81,    84,
      91,    68,    90,    93,    94,   101,   102,   105,     1,  -101,
    -101,  -101,  -101,  -101,  -101,  -101,    -6,  -101,  -101,  -101,
     109,  -101,  -101,  -101,  -101,  -101,  -101,  -101,  -101,  -101,
    -101,  -101,  -101,    -6,    83,    96,    -6,   106,  -101,  -101,
    -101,  -101,  -101,  -101,   110,   115,  -101,   117,   -10,   127,
     130,   138,   136,  -101,  -101,   137,    -6,    -6,  -101,  -101,
      58,   126,   128,  -101,  -101,    26,    60,   141,   150,    70,
     140,  -101,   139,  -101,  -101,   154,   155,    72,  -101,  -101,
    -101,   107,   119,  -101,  -101
};

/* YYPGOTO[NTERM-NUM].  */
static const yytype_int8 yypgoto[] =
{
    -101,  -101,  -100,  -101,  -101,  -101,  -101,    49,  -101,   -30,
    -101,   -24,  -101,  -101,  -101,    -5,  -101,  -101,   -28,  -101,
    -101,  -101,  -101
};

/* YYTABLE[YYPACT[STATE-NUM]].  What to do in state STATE-NUM.  If
   positive, shift that token.  If negative, reduce the rule which
   number is the opposite.  If zero, do what YYDEFACT says.
   If YYTABLE_NINF, syntax error.  */
#define YYTABLE_NINF -1
static const yytype_uint8 yytable[] =
{
      21,    50,    49,    42,    38,    52,    53,    54,   115,   116,
       4,    39,    40,     6,    57,    59,    60,     7,    94,    95,
       3,     8,     9,   127,    10,     1,    11,    12,   131,   132,
      13,    14,    27,    61,    62,    63,    64,   106,   107,   120,
      15,    28,    96,     7,    65,    41,    15,     8,     9,    29,
      10,    30,    11,    12,    31,    32,    13,    14,   101,    98,
      67,    68,    69,    70,    33,    34,    35,    71,    72,    36,
      37,    58,    15,   121,    46,     7,    51,     7,   113,   114,
     117,     8,     9,    55,    10,   130,    11,    12,    56,     7,
      13,    14,    84,     8,     9,    85,    10,    86,    11,    12,
      87,    88,    13,    14,    89,    90,    15,    67,    68,    69,
      21,    21,    91,    92,    71,    72,    93,    99,    15,    97,
     133,   100,    21,   102,     7,   103,    21,    21,     8,     9,
     104,    10,   134,    11,    12,   105,     7,    13,    14,   108,
       8,     9,   109,    10,   110,    11,    12,   111,   112,    13,
      14,   118,   122,    15,    76,    77,    78,    79,    80,    81,
      82,   119,   123,   125,   126,    15,   128,   129,   124
};

static const yytype_uint8 yycheck[] =
{
       5,    31,    30,    27,    10,    17,    18,    19,   108,   109,
       0,    17,    18,    13,    38,    17,    18,    17,    17,    18,
      12,    21,    22,   123,    24,    20,    26,    27,   128,   129,
      30,    31,    54,    50,    51,    52,    53,    47,    48,    13,
      46,    17,    66,    17,    61,    51,    46,    21,    22,    10,
      24,    10,    26,    27,    10,    10,    30,    31,    86,    83,
      37,    38,    39,    40,    10,    10,    10,    44,    45,     6,
       6,    14,    46,    13,     7,    17,    17,    17,   106,   107,
     110,    21,    22,    17,    24,    13,    26,    27,    17,    17,
      30,    31,    11,    21,    22,    11,    24,     6,    26,    27,
      32,    11,    30,    31,    11,    11,    46,    37,    38,    39,
     115,   116,    11,    11,    44,    45,    11,    34,    46,    10,
      13,    25,   127,    17,    17,    15,   131,   132,    21,    22,
      15,    24,    13,    26,    27,    18,    17,    30,    31,    12,
      21,    22,    12,    24,     6,    26,    27,    11,    11,    30,
      31,    25,    11,    46,    54,    55,    56,    57,    58,    59,
      60,    33,    12,    23,    25,    46,    12,    12,   119
};

/* YYSTOS[STATE-NUM] -- The (internal number of the) accessing
   symbol of state STATE-NUM.  */
static const yytype_uint8 yystos[] =
{
       0,    20,    63,    12,     0,    64,    13,    17,    21,    22,
      24,    26,    27,    30,    31,    46,    65,    66,    67,    71,
      76,    77,    78,    79,    82,    83,    84,    54,    17,    10,
      10,    10,    10,    10,    10,    10,     6,     6,    10,    17,
      18,    51,    73,    74,    75,    77,     7,    73,    80,    80,
      71,    17,    17,    18,    19,    17,    17,    73,    14,    17,
      18,    50,    51,    52,    53,    61,    72,    37,    38,    39,
      40,    44,    45,    68,    69,    70,    54,    55,    56,    57,
      58,    59,    60,    81,    11,    11,     6,    32,    11,    11,
      11,    11,    11,    11,    17,    18,    73,    10,    73,    34,
      25,    80,    17,    15,    15,    18,    47,    48,    12,    12,
       6,    11,    11,    80,    80,    64,    64,    71,    25,    33,
      13,    13,    11,    12,    69,    23,    25,    64,    12,    12,
      13,    64,    64,    13,    13
};

#define yyerrok		(yyerrstatus = 0)
#define yyclearin	(yychar = YYEMPTY)
#define YYEMPTY		(-2)
#define YYEOF		0

#define YYACCEPT	goto yyacceptlab
#define YYABORT		goto yyabortlab
#define YYERROR		goto yyerrorlab


/* Like YYERROR except do call yyerror.  This remains here temporarily
   to ease the transition to the new meaning of YYERROR, for GCC.
   Once GCC version 2 has supplanted version 1, this can go.  */

#define YYFAIL		goto yyerrlab

#define YYRECOVERING()  (!!yyerrstatus)

#define YYBACKUP(Token, Value)					\
do								\
  if (yychar == YYEMPTY && yylen == 1)				\
    {								\
      yychar = (Token);						\
      yylval = (Value);						\
      yytoken = YYTRANSLATE (yychar);				\
      YYPOPSTACK (1);						\
      goto yybackup;						\
    }								\
  else								\
    {								\
      yyerror (YY_("syntax error: cannot back up")); \
      YYERROR;							\
    }								\
while (YYID (0))


#define YYTERROR	1
#define YYERRCODE	256


/* YYLLOC_DEFAULT -- Set CURRENT to span from RHS[1] to RHS[N].
   If N is 0, then set CURRENT to the empty location which ends
   the previous symbol: RHS[0] (always defined).  */

#define YYRHSLOC(Rhs, K) ((Rhs)[K])
#ifndef YYLLOC_DEFAULT
# define YYLLOC_DEFAULT(Current, Rhs, N)				\
    do									\
      if (YYID (N))                                                    \
	{								\
	  (Current).first_line   = YYRHSLOC (Rhs, 1).first_line;	\
	  (Current).first_column = YYRHSLOC (Rhs, 1).first_column;	\
	  (Current).last_line    = YYRHSLOC (Rhs, N).last_line;		\
	  (Current).last_column  = YYRHSLOC (Rhs, N).last_column;	\
	}								\
      else								\
	{								\
	  (Current).first_line   = (Current).last_line   =		\
	    YYRHSLOC (Rhs, 0).last_line;				\
	  (Current).first_column = (Current).last_column =		\
	    YYRHSLOC (Rhs, 0).last_column;				\
	}								\
    while (YYID (0))
#endif


/* YY_LOCATION_PRINT -- Print the location on the stream.
   This macro was not mandated originally: define only if we know
   we won't break user code: when these are the locations we know.  */

#ifndef YY_LOCATION_PRINT
# if defined YYLTYPE_IS_TRIVIAL && YYLTYPE_IS_TRIVIAL
#  define YY_LOCATION_PRINT(File, Loc)			\
     fprintf (File, "%d.%d-%d.%d",			\
	      (Loc).first_line, (Loc).first_column,	\
	      (Loc).last_line,  (Loc).last_column)
# else
#  define YY_LOCATION_PRINT(File, Loc) ((void) 0)
# endif
#endif


/* YYLEX -- calling `yylex' with the right arguments.  */

#ifdef YYLEX_PARAM
# define YYLEX yylex (YYLEX_PARAM)
#else
# define YYLEX yylex ()
#endif

/* Enable debugging if requested.  */
#if YYDEBUG

# ifndef YYFPRINTF
#  include <stdio.h> /* INFRINGES ON USER NAME SPACE */
#  define YYFPRINTF fprintf
# endif

# define YYDPRINTF(Args)			\
do {						\
  if (yydebug)					\
    YYFPRINTF Args;				\
} while (YYID (0))

# define YY_SYMBOL_PRINT(Title, Type, Value, Location)			  \
do {									  \
  if (yydebug)								  \
    {									  \
      YYFPRINTF (stderr, "%s ", Title);					  \
      yy_symbol_print (stderr,						  \
		  Type, Value); \
      YYFPRINTF (stderr, "\n");						  \
    }									  \
} while (YYID (0))


/*--------------------------------.
| Print this symbol on YYOUTPUT.  |
`--------------------------------*/

/*ARGSUSED*/
#if (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
static void
yy_symbol_value_print (FILE *yyoutput, int yytype, YYSTYPE const * const yyvaluep)
#else
static void
yy_symbol_value_print (yyoutput, yytype, yyvaluep)
    FILE *yyoutput;
    int yytype;
    YYSTYPE const * const yyvaluep;
#endif
{
  if (!yyvaluep)
    return;
# ifdef YYPRINT
  if (yytype < YYNTOKENS)
    YYPRINT (yyoutput, yytoknum[yytype], *yyvaluep);
# else
  YYUSE (yyoutput);
# endif
  switch (yytype)
    {
      default:
	break;
    }
}


/*--------------------------------.
| Print this symbol on YYOUTPUT.  |
`--------------------------------*/

#if (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
static void
yy_symbol_print (FILE *yyoutput, int yytype, YYSTYPE const * const yyvaluep)
#else
static void
yy_symbol_print (yyoutput, yytype, yyvaluep)
    FILE *yyoutput;
    int yytype;
    YYSTYPE const * const yyvaluep;
#endif
{
  if (yytype < YYNTOKENS)
    YYFPRINTF (yyoutput, "token %s (", yytname[yytype]);
  else
    YYFPRINTF (yyoutput, "nterm %s (", yytname[yytype]);

  yy_symbol_value_print (yyoutput, yytype, yyvaluep);
  YYFPRINTF (yyoutput, ")");
}

/*------------------------------------------------------------------.
| yy_stack_print -- Print the state stack from its BOTTOM up to its |
| TOP (included).                                                   |
`------------------------------------------------------------------*/

#if (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
static void
yy_stack_print (yytype_int16 *bottom, yytype_int16 *top)
#else
static void
yy_stack_print (bottom, top)
    yytype_int16 *bottom;
    yytype_int16 *top;
#endif
{
  YYFPRINTF (stderr, "Stack now");
  for (; bottom <= top; ++bottom)
    YYFPRINTF (stderr, " %d", *bottom);
  YYFPRINTF (stderr, "\n");
}

# define YY_STACK_PRINT(Bottom, Top)				\
do {								\
  if (yydebug)							\
    yy_stack_print ((Bottom), (Top));				\
} while (YYID (0))


/*------------------------------------------------.
| Report that the YYRULE is going to be reduced.  |
`------------------------------------------------*/

#if (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
static void
yy_reduce_print (YYSTYPE *yyvsp, int yyrule)
#else
static void
yy_reduce_print (yyvsp, yyrule)
    YYSTYPE *yyvsp;
    int yyrule;
#endif
{
  int yynrhs = yyr2[yyrule];
  int yyi;
  unsigned long int yylno = yyrline[yyrule];
  YYFPRINTF (stderr, "Reducing stack by rule %d (line %lu):\n",
	     yyrule - 1, yylno);
  /* The symbols being reduced.  */
  for (yyi = 0; yyi < yynrhs; yyi++)
    {
      fprintf (stderr, "   $%d = ", yyi + 1);
      yy_symbol_print (stderr, yyrhs[yyprhs[yyrule] + yyi],
		       &(yyvsp[(yyi + 1) - (yynrhs)])
		       		       );
      fprintf (stderr, "\n");
    }
}

# define YY_REDUCE_PRINT(Rule)		\
do {					\
  if (yydebug)				\
    yy_reduce_print (yyvsp, Rule); \
} while (YYID (0))

/* Nonzero means print parse trace.  It is left uninitialized so that
   multiple parsers can coexist.  */
int yydebug;
#else /* !YYDEBUG */
# define YYDPRINTF(Args)
# define YY_SYMBOL_PRINT(Title, Type, Value, Location)
# define YY_STACK_PRINT(Bottom, Top)
# define YY_REDUCE_PRINT(Rule)
#endif /* !YYDEBUG */


/* YYINITDEPTH -- initial size of the parser's stacks.  */
#ifndef	YYINITDEPTH
# define YYINITDEPTH 200
#endif

/* YYMAXDEPTH -- maximum size the stacks can grow to (effective only
   if the built-in stack extension method is used).

   Do not make this value too large; the results are undefined if
   YYSTACK_ALLOC_MAXIMUM < YYSTACK_BYTES (YYMAXDEPTH)
   evaluated with infinite-precision integer arithmetic.  */

#ifndef YYMAXDEPTH
# define YYMAXDEPTH 10000
#endif



#if YYERROR_VERBOSE

# ifndef yystrlen
#  if defined __GLIBC__ && defined _STRING_H
#   define yystrlen strlen
#  else
/* Return the length of YYSTR.  */
#if (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
static YYSIZE_T
yystrlen (const char *yystr)
#else
static YYSIZE_T
yystrlen (yystr)
    const char *yystr;
#endif
{
  YYSIZE_T yylen;
  for (yylen = 0; yystr[yylen]; yylen++)
    continue;
  return yylen;
}
#  endif
# endif

# ifndef yystpcpy
#  if defined __GLIBC__ && defined _STRING_H && defined _GNU_SOURCE
#   define yystpcpy stpcpy
#  else
/* Copy YYSRC to YYDEST, returning the address of the terminating '\0' in
   YYDEST.  */
#if (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
static char *
yystpcpy (char *yydest, const char *yysrc)
#else
static char *
yystpcpy (yydest, yysrc)
    char *yydest;
    const char *yysrc;
#endif
{
  char *yyd = yydest;
  const char *yys = yysrc;

  while ((*yyd++ = *yys++) != '\0')
    continue;

  return yyd - 1;
}
#  endif
# endif

# ifndef yytnamerr
/* Copy to YYRES the contents of YYSTR after stripping away unnecessary
   quotes and backslashes, so that it's suitable for yyerror.  The
   heuristic is that double-quoting is unnecessary unless the string
   contains an apostrophe, a comma, or backslash (other than
   backslash-backslash).  YYSTR is taken from yytname.  If YYRES is
   null, do not copy; instead, return the length of what the result
   would have been.  */
static YYSIZE_T
yytnamerr (char *yyres, const char *yystr)
{
  if (*yystr == '"')
    {
      YYSIZE_T yyn = 0;
      char const *yyp = yystr;

      for (;;)
	switch (*++yyp)
	  {
	  case '\'':
	  case ',':
	    goto do_not_strip_quotes;

	  case '\\':
	    if (*++yyp != '\\')
	      goto do_not_strip_quotes;
	    /* Fall through.  */
	  default:
	    if (yyres)
	      yyres[yyn] = *yyp;
	    yyn++;
	    break;

	  case '"':
	    if (yyres)
	      yyres[yyn] = '\0';
	    return yyn;
	  }
    do_not_strip_quotes: ;
    }

  if (! yyres)
    return yystrlen (yystr);

  return yystpcpy (yyres, yystr) - yyres;
}
# endif

/* Copy into YYRESULT an error message about the unexpected token
   YYCHAR while in state YYSTATE.  Return the number of bytes copied,
   including the terminating null byte.  If YYRESULT is null, do not
   copy anything; just return the number of bytes that would be
   copied.  As a special case, return 0 if an ordinary "syntax error"
   message will do.  Return YYSIZE_MAXIMUM if overflow occurs during
   size calculation.  */
static YYSIZE_T
yysyntax_error (char *yyresult, int yystate, int yychar)
{
  int yyn = yypact[yystate];

  if (! (YYPACT_NINF < yyn && yyn <= YYLAST))
    return 0;
  else
    {
      int yytype = YYTRANSLATE (yychar);
      YYSIZE_T yysize0 = yytnamerr (0, yytname[yytype]);
      YYSIZE_T yysize = yysize0;
      YYSIZE_T yysize1;
      int yysize_overflow = 0;
      enum { YYERROR_VERBOSE_ARGS_MAXIMUM = 5 };
      char const *yyarg[YYERROR_VERBOSE_ARGS_MAXIMUM];
      int yyx;

# if 0
      /* This is so xgettext sees the translatable formats that are
	 constructed on the fly.  */
      YY_("syntax error, unexpected %s");
      YY_("syntax error, unexpected %s, expecting %s");
      YY_("syntax error, unexpected %s, expecting %s or %s");
      YY_("syntax error, unexpected %s, expecting %s or %s or %s");
      YY_("syntax error, unexpected %s, expecting %s or %s or %s or %s");
# endif
      char *yyfmt;
      char const *yyf;
      static char const yyunexpected[] = "syntax error, unexpected %s";
      static char const yyexpecting[] = ", expecting %s";
      static char const yyor[] = " or %s";
      char yyformat[sizeof yyunexpected
		    + sizeof yyexpecting - 1
		    + ((YYERROR_VERBOSE_ARGS_MAXIMUM - 2)
		       * (sizeof yyor - 1))];
      char const *yyprefix = yyexpecting;

      /* Start YYX at -YYN if negative to avoid negative indexes in
	 YYCHECK.  */
      int yyxbegin = yyn < 0 ? -yyn : 0;

      /* Stay within bounds of both yycheck and yytname.  */
      int yychecklim = YYLAST - yyn + 1;
      int yyxend = yychecklim < YYNTOKENS ? yychecklim : YYNTOKENS;
      int yycount = 1;

      yyarg[0] = yytname[yytype];
      yyfmt = yystpcpy (yyformat, yyunexpected);

      for (yyx = yyxbegin; yyx < yyxend; ++yyx)
	if (yycheck[yyx + yyn] == yyx && yyx != YYTERROR)
	  {
	    if (yycount == YYERROR_VERBOSE_ARGS_MAXIMUM)
	      {
		yycount = 1;
		yysize = yysize0;
		yyformat[sizeof yyunexpected - 1] = '\0';
		break;
	      }
	    yyarg[yycount++] = yytname[yyx];
	    yysize1 = yysize + yytnamerr (0, yytname[yyx]);
	    yysize_overflow |= (yysize1 < yysize);
	    yysize = yysize1;
	    yyfmt = yystpcpy (yyfmt, yyprefix);
	    yyprefix = yyor;
	  }

      yyf = YY_(yyformat);
      yysize1 = yysize + yystrlen (yyf);
      yysize_overflow |= (yysize1 < yysize);
      yysize = yysize1;

      if (yysize_overflow)
	return YYSIZE_MAXIMUM;

      if (yyresult)
	{
	  /* Avoid sprintf, as that infringes on the user's name space.
	     Don't have undefined behavior even if the translation
	     produced a string with the wrong number of "%s"s.  */
	  char *yyp = yyresult;
	  int yyi = 0;
	  while ((*yyp = *yyf) != '\0')
	    {
	      if (*yyp == '%' && yyf[1] == 's' && yyi < yycount)
		{
		  yyp += yytnamerr (yyp, yyarg[yyi++]);
		  yyf += 2;
		}
	      else
		{
		  yyp++;
		  yyf++;
		}
	    }
	}
      return yysize;
    }
}
#endif /* YYERROR_VERBOSE */


/*-----------------------------------------------.
| Release the memory associated to this symbol.  |
`-----------------------------------------------*/

/*ARGSUSED*/
#if (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
static void
yydestruct (const char *yymsg, int yytype, YYSTYPE *yyvaluep)
#else
static void
yydestruct (yymsg, yytype, yyvaluep)
    const char *yymsg;
    int yytype;
    YYSTYPE *yyvaluep;
#endif
{
  YYUSE (yyvaluep);

  if (!yymsg)
    yymsg = "Deleting";
  YY_SYMBOL_PRINT (yymsg, yytype, yyvaluep, yylocationp);

  switch (yytype)
    {

      default:
	break;
    }
}


/* Prevent warnings from -Wmissing-prototypes.  */

#ifdef YYPARSE_PARAM
#if defined __STDC__ || defined __cplusplus
int yyparse (void *YYPARSE_PARAM);
#else
int yyparse ();
#endif
#else /* ! YYPARSE_PARAM */
#if defined __STDC__ || defined __cplusplus
int yyparse (void);
#else
int yyparse ();
#endif
#endif /* ! YYPARSE_PARAM */



/* The look-ahead symbol.  */
int yychar;

/* The semantic value of the look-ahead symbol.  */
YYSTYPE yylval;

/* Number of syntax errors so far.  */
int yynerrs;



/*----------.
| yyparse.  |
`----------*/

#ifdef YYPARSE_PARAM
#if (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
int
yyparse (void *YYPARSE_PARAM)
#else
int
yyparse (YYPARSE_PARAM)
    void *YYPARSE_PARAM;
#endif
#else /* ! YYPARSE_PARAM */
#if (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
int
yyparse (void)
#else
int
yyparse ()

#endif
#endif
{
  
  int yystate;
  int yyn;
  int yyresult;
  /* Number of tokens to shift before error messages enabled.  */
  int yyerrstatus;
  /* Look-ahead token as an internal (translated) token number.  */
  int yytoken = 0;
#if YYERROR_VERBOSE
  /* Buffer for error messages, and its allocated size.  */
  char yymsgbuf[128];
  char *yymsg = yymsgbuf;
  YYSIZE_T yymsg_alloc = sizeof yymsgbuf;
#endif

  /* Three stacks and their tools:
     `yyss': related to states,
     `yyvs': related to semantic values,
     `yyls': related to locations.

     Refer to the stacks thru separate pointers, to allow yyoverflow
     to reallocate them elsewhere.  */

  /* The state stack.  */
  yytype_int16 yyssa[YYINITDEPTH];
  yytype_int16 *yyss = yyssa;
  yytype_int16 *yyssp;

  /* The semantic value stack.  */
  YYSTYPE yyvsa[YYINITDEPTH];
  YYSTYPE *yyvs = yyvsa;
  YYSTYPE *yyvsp;



#define YYPOPSTACK(N)   (yyvsp -= (N), yyssp -= (N))

  YYSIZE_T yystacksize = YYINITDEPTH;

  /* The variables used to return semantic value and location from the
     action routines.  */
  YYSTYPE yyval;


  /* The number of symbols on the RHS of the reduced rule.
     Keep to zero when no symbol should be popped.  */
  int yylen = 0;

  YYDPRINTF ((stderr, "Starting parse\n"));

  yystate = 0;
  yyerrstatus = 0;
  yynerrs = 0;
  yychar = YYEMPTY;		/* Cause a token to be read.  */

  /* Initialize stack pointers.
     Waste one element of value and location stack
     so that they stay on the same level as the state stack.
     The wasted elements are never initialized.  */

  yyssp = yyss;
  yyvsp = yyvs;

  goto yysetstate;

/*------------------------------------------------------------.
| yynewstate -- Push a new state, which is found in yystate.  |
`------------------------------------------------------------*/
 yynewstate:
  /* In all cases, when you get here, the value and location stacks
     have just been pushed.  So pushing a state here evens the stacks.  */
  yyssp++;

 yysetstate:
  *yyssp = yystate;

  if (yyss + yystacksize - 1 <= yyssp)
    {
      /* Get the current used size of the three stacks, in elements.  */
      YYSIZE_T yysize = yyssp - yyss + 1;

#ifdef yyoverflow
      {
	/* Give user a chance to reallocate the stack.  Use copies of
	   these so that the &'s don't force the real ones into
	   memory.  */
	YYSTYPE *yyvs1 = yyvs;
	yytype_int16 *yyss1 = yyss;


	/* Each stack pointer address is followed by the size of the
	   data in use in that stack, in bytes.  This used to be a
	   conditional around just the two extra args, but that might
	   be undefined if yyoverflow is a macro.  */
	yyoverflow (YY_("memory exhausted"),
		    &yyss1, yysize * sizeof (*yyssp),
		    &yyvs1, yysize * sizeof (*yyvsp),

		    &yystacksize);

	yyss = yyss1;
	yyvs = yyvs1;
      }
#else /* no yyoverflow */
# ifndef YYSTACK_RELOCATE
      goto yyexhaustedlab;
# else
      /* Extend the stack our own way.  */
      if (YYMAXDEPTH <= yystacksize)
	goto yyexhaustedlab;
      yystacksize *= 2;
      if (YYMAXDEPTH < yystacksize)
	yystacksize = YYMAXDEPTH;

      {
	yytype_int16 *yyss1 = yyss;
	union yyalloc *yyptr =
	  (union yyalloc *) YYSTACK_ALLOC (YYSTACK_BYTES (yystacksize));
	if (! yyptr)
	  goto yyexhaustedlab;
	YYSTACK_RELOCATE (yyss);
	YYSTACK_RELOCATE (yyvs);

#  undef YYSTACK_RELOCATE
	if (yyss1 != yyssa)
	  YYSTACK_FREE (yyss1);
      }
# endif
#endif /* no yyoverflow */

      yyssp = yyss + yysize - 1;
      yyvsp = yyvs + yysize - 1;


      YYDPRINTF ((stderr, "Stack size increased to %lu\n",
		  (unsigned long int) yystacksize));

      if (yyss + yystacksize - 1 <= yyssp)
	YYABORT;
    }

  YYDPRINTF ((stderr, "Entering state %d\n", yystate));

  goto yybackup;

/*-----------.
| yybackup.  |
`-----------*/
yybackup:

  /* Do appropriate processing given the current state.  Read a
     look-ahead token if we need one and don't already have one.  */

  /* First try to decide what to do without reference to look-ahead token.  */
  yyn = yypact[yystate];
  if (yyn == YYPACT_NINF)
    goto yydefault;

  /* Not known => get a look-ahead token if don't already have one.  */

  /* YYCHAR is either YYEMPTY or YYEOF or a valid look-ahead symbol.  */
  if (yychar == YYEMPTY)
    {
      YYDPRINTF ((stderr, "Reading a token: "));
      yychar = YYLEX;
    }

  if (yychar <= YYEOF)
    {
      yychar = yytoken = YYEOF;
      YYDPRINTF ((stderr, "Now at end of input.\n"));
    }
  else
    {
      yytoken = YYTRANSLATE (yychar);
      YY_SYMBOL_PRINT ("Next token is", yytoken, &yylval, &yylloc);
    }

  /* If the proper action on seeing token YYTOKEN is to reduce or to
     detect an error, take that action.  */
  yyn += yytoken;
  if (yyn < 0 || YYLAST < yyn || yycheck[yyn] != yytoken)
    goto yydefault;
  yyn = yytable[yyn];
  if (yyn <= 0)
    {
      if (yyn == 0 || yyn == YYTABLE_NINF)
	goto yyerrlab;
      yyn = -yyn;
      goto yyreduce;
    }

  if (yyn == YYFINAL)
    YYACCEPT;

  /* Count tokens shifted since error; after three, turn off error
     status.  */
  if (yyerrstatus)
    yyerrstatus--;

  /* Shift the look-ahead token.  */
  YY_SYMBOL_PRINT ("Shifting", yytoken, &yylval, &yylloc);

  /* Discard the shifted token unless it is eof.  */
  if (yychar != YYEOF)
    yychar = YYEMPTY;

  yystate = yyn;
  *++yyvsp = yylval;

  goto yynewstate;


/*-----------------------------------------------------------.
| yydefault -- do the default action for the current state.  |
`-----------------------------------------------------------*/
yydefault:
  yyn = yydefact[yystate];
  if (yyn == 0)
    goto yyerrlab;
  goto yyreduce;


/*-----------------------------.
| yyreduce -- Do a reduction.  |
`-----------------------------*/
yyreduce:
  /* yyn is the number of a rule to reduce with.  */
  yylen = yyr2[yyn];

  /* If YYLEN is nonzero, implement the default value of the action:
     `$$ = $1'.

     Otherwise, the following line sets YYVAL to garbage.
     This behavior is undocumented and Bison
     users should not rely upon it.  Assigning to YYVAL
     unconditionally makes the parser a bit smaller, and it avoids a
     GCC warning that YYVAL may be used uninitialized.  */
  yyval = yyvsp[1-yylen];


  YY_REDUCE_PRINT (yyn);
  switch (yyn)
    {
        case 2:
#line 78 "lang.y"
    { printf("program -> prog { stmtlist }\n"); ;}
    break;

  case 3:
#line 81 "lang.y"
    { printf("stmtlist -> stmtlist stmt ;\n"); ;}
    break;

  case 4:
#line 82 "lang.y"
    { printf("stmtlist -> stmtlist stmt\n"); ;}
    break;

  case 5:
#line 83 "lang.y"
    { printf("stmtlist -> empty\n"); ;}
    break;

  case 6:
#line 86 "lang.y"
    { printf("stmt -> simplstmt ;\n"); ;}
    break;

  case 7:
#line 87 "lang.y"
    { printf("stmt -> structstmt\n"); ;}
    break;

  case 8:
#line 90 "lang.y"
    { printf("simplstmt -> declaration\n"); ;}
    break;

  case 9:
#line 91 "lang.y"
    { printf("simplstmt -> assignstmt\n"); ;}
    break;

  case 10:
#line 92 "lang.y"
    { printf("simplstmt -> iostmt\n"); ;}
    break;

  case 11:
#line 93 "lang.y"
    { printf("simplstmt -> radstmt\n"); ;}
    break;

  case 12:
#line 96 "lang.y"
    { printf("declaration -> cvnou identifier : type\n"); ;}
    break;

  case 13:
#line 99 "lang.y"
    { printf("type -> type1\n"); ;}
    break;

  case 14:
#line 100 "lang.y"
    { printf("type -> arraydecl\n"); ;}
    break;

  case 15:
#line 103 "lang.y"
    { printf("type1 -> intreg\n"); ;}
    break;

  case 16:
#line 104 "lang.y"
    { printf("type1 -> real\n"); ;}
    break;

  case 17:
#line 105 "lang.y"
    { printf("type1 -> sfoara\n"); ;}
    break;

  case 18:
#line 106 "lang.y"
    { printf("type1 -> caracter\n"); ;}
    break;

  case 19:
#line 107 "lang.y"
    { printf("type1 -> advfals\n"); ;}
    break;

  case 20:
#line 110 "lang.y"
    { printf("arraydecl -> sir parantezadeschisa intconstant parantezainchisa de type1\n"); ;}
    break;

  case 21:
#line 113 "lang.y"
    { printf("assignstmt -> identifier estiegal expression\n"); ;}
    break;

  case 22:
#line 116 "lang.y"
    { printf("operator -> adunate\n"); ;}
    break;

  case 23:
#line 117 "lang.y"
    { printf("operator -> stergete\n"); ;}
    break;

  case 24:
#line 118 "lang.y"
    { printf("operator -> oriori\n"); ;}
    break;

  case 25:
#line 119 "lang.y"
    { printf("operator -> orioriinvers\n"); ;}
    break;

  case 26:
#line 120 "lang.y"
    { printf("operator -> lasuta\n"); ;}
    break;

  case 27:
#line 123 "lang.y"
    { printf("expression -> term\n"); ;}
    break;

  case 28:
#line 124 "lang.y"
    { printf("expression -> term operator expression\n"); ;}
    break;

  case 29:
#line 127 "lang.y"
    { printf("term -> identifier\n"); ;}
    break;

  case 30:
#line 128 "lang.y"
    { printf("term -> intconstant\n"); ;}
    break;

  case 31:
#line 129 "lang.y"
    { printf("term -> factor\n"); ;}
    break;

  case 32:
#line 132 "lang.y"
    { printf("factor -> stergete identifier\n"); ;}
    break;

  case 33:
#line 133 "lang.y"
    { printf("factor -> stergete intconstant\n"); ;}
    break;

  case 34:
#line 134 "lang.y"
    { printf("factor -> radstmt\n"); ;}
    break;

  case 35:
#line 135 "lang.y"
    { printf("factor -> identifier [ identifier ]\n"); ;}
    break;

  case 36:
#line 136 "lang.y"
    { printf("factor -> identifier [ intconstant ]\n"); ;}
    break;

  case 37:
#line 137 "lang.y"
    { printf("factor -> ( expression )\n"); ;}
    break;

  case 38:
#line 140 "lang.y"
    { printf("iostmt -> citeste ( identifier )\n"); ;}
    break;

  case 39:
#line 141 "lang.y"
    { printf("iostmt -> scrie ( identifier )\n"); ;}
    break;

  case 40:
#line 142 "lang.y"
    { printf("iostmt -> scrie ( intconstant )\n"); ;}
    break;

  case 41:
#line 143 "lang.y"
    { printf("iostmt -> scrie ( stringconstant )\n"); ;}
    break;

  case 42:
#line 146 "lang.y"
    { printf("radstmt -> radical ( identifier )\n"); ;}
    break;

  case 43:
#line 149 "lang.y"
    { printf("structstmt -> daca\n"); ;}
    break;

  case 44:
#line 150 "lang.y"
    { printf("structstmt -> cattimp\n"); ;}
    break;

  case 45:
#line 151 "lang.y"
    { printf("structstmt -> pentrufiecare\n"); ;}
    break;

  case 46:
#line 152 "lang.y"
    { printf("structstmt -> pentru\n"); ;}
    break;

  case 47:
#line 155 "lang.y"
    { printf("ifstmt -> daca parantezadeschisa condition parantezainchisa atunci acoladadeschisa stmtlist acoladainchisa\n"); ;}
    break;

  case 48:
#line 156 "lang.y"
    { printf("ifstmt -> daca parantezadeschisa condition parantezainchisa atunci acoladadeschisa stmtlist acoladainchisa altfel acoladadeschisa stmtlist acoladainchisa\n"); ;}
    break;

  case 49:
#line 159 "lang.y"
    { printf("condition -> expression relation expression\n"); ;}
    break;

  case 50:
#line 160 "lang.y"
    { printf("condition -> expression relation expression sisi condition\n"); ;}
    break;

  case 51:
#line 161 "lang.y"
    { printf("condition -> expression relation expression sausau condition\n"); ;}
    break;

  case 52:
#line 164 "lang.y"
    { printf("relation -> maimareegal\n"); ;}
    break;

  case 53:
#line 165 "lang.y"
    { printf("relation -> maimicegal\n"); ;}
    break;

  case 54:
#line 166 "lang.y"
    { printf("relation -> maimare\n"); ;}
    break;

  case 55:
#line 167 "lang.y"
    { printf("relation -> maimic\n"); ;}
    break;

  case 56:
#line 168 "lang.y"
    { printf("relation -> verificaegal\n"); ;}
    break;

  case 57:
#line 169 "lang.y"
    { printf("relation -> estiegal\n"); ;}
    break;

  case 58:
#line 170 "lang.y"
    { printf("relation -> verificanuegal\n"); ;}
    break;

  case 59:
#line 173 "lang.y"
    { printf("whilestmt -> cattimp parantezadeschisa condition parantezainchisa fa acoladadeschisa stmtlist acoladainchisa\n"); ;}
    break;

  case 60:
#line 176 "lang.y"
    { printf("forstmt -> pentru parantezadeschisa assignstmt ; condition ; assignstmt parantezainchisa fa acoladadeschisa stmtlist acoladainchisa\n"); ;}
    break;

  case 61:
#line 179 "lang.y"
    { printf("foreachstmt -> pentrufiecare parantezadeschisa identifier in identifier parantezainchisa fa acoladadeschisa stmtlist acoladainchisa\n"); ;}
    break;


/* Line 1267 of yacc.c.  */
#line 1864 "lang.tab.c"
      default: break;
    }
  YY_SYMBOL_PRINT ("-> $$ =", yyr1[yyn], &yyval, &yyloc);

  YYPOPSTACK (yylen);
  yylen = 0;
  YY_STACK_PRINT (yyss, yyssp);

  *++yyvsp = yyval;


  /* Now `shift' the result of the reduction.  Determine what state
     that goes to, based on the state we popped back to and the rule
     number reduced by.  */

  yyn = yyr1[yyn];

  yystate = yypgoto[yyn - YYNTOKENS] + *yyssp;
  if (0 <= yystate && yystate <= YYLAST && yycheck[yystate] == *yyssp)
    yystate = yytable[yystate];
  else
    yystate = yydefgoto[yyn - YYNTOKENS];

  goto yynewstate;


/*------------------------------------.
| yyerrlab -- here on detecting error |
`------------------------------------*/
yyerrlab:
  /* If not already recovering from an error, report this error.  */
  if (!yyerrstatus)
    {
      ++yynerrs;
#if ! YYERROR_VERBOSE
      yyerror (YY_("syntax error"));
#else
      {
	YYSIZE_T yysize = yysyntax_error (0, yystate, yychar);
	if (yymsg_alloc < yysize && yymsg_alloc < YYSTACK_ALLOC_MAXIMUM)
	  {
	    YYSIZE_T yyalloc = 2 * yysize;
	    if (! (yysize <= yyalloc && yyalloc <= YYSTACK_ALLOC_MAXIMUM))
	      yyalloc = YYSTACK_ALLOC_MAXIMUM;
	    if (yymsg != yymsgbuf)
	      YYSTACK_FREE (yymsg);
	    yymsg = (char *) YYSTACK_ALLOC (yyalloc);
	    if (yymsg)
	      yymsg_alloc = yyalloc;
	    else
	      {
		yymsg = yymsgbuf;
		yymsg_alloc = sizeof yymsgbuf;
	      }
	  }

	if (0 < yysize && yysize <= yymsg_alloc)
	  {
	    (void) yysyntax_error (yymsg, yystate, yychar);
	    yyerror (yymsg);
	  }
	else
	  {
	    yyerror (YY_("syntax error"));
	    if (yysize != 0)
	      goto yyexhaustedlab;
	  }
      }
#endif
    }



  if (yyerrstatus == 3)
    {
      /* If just tried and failed to reuse look-ahead token after an
	 error, discard it.  */

      if (yychar <= YYEOF)
	{
	  /* Return failure if at end of input.  */
	  if (yychar == YYEOF)
	    YYABORT;
	}
      else
	{
	  yydestruct ("Error: discarding",
		      yytoken, &yylval);
	  yychar = YYEMPTY;
	}
    }

  /* Else will try to reuse look-ahead token after shifting the error
     token.  */
  goto yyerrlab1;


/*---------------------------------------------------.
| yyerrorlab -- error raised explicitly by YYERROR.  |
`---------------------------------------------------*/
yyerrorlab:

  /* Pacify compilers like GCC when the user code never invokes
     YYERROR and the label yyerrorlab therefore never appears in user
     code.  */
  if (/*CONSTCOND*/ 0)
     goto yyerrorlab;

  /* Do not reclaim the symbols of the rule which action triggered
     this YYERROR.  */
  YYPOPSTACK (yylen);
  yylen = 0;
  YY_STACK_PRINT (yyss, yyssp);
  yystate = *yyssp;
  goto yyerrlab1;


/*-------------------------------------------------------------.
| yyerrlab1 -- common code for both syntax error and YYERROR.  |
`-------------------------------------------------------------*/
yyerrlab1:
  yyerrstatus = 3;	/* Each real token shifted decrements this.  */

  for (;;)
    {
      yyn = yypact[yystate];
      if (yyn != YYPACT_NINF)
	{
	  yyn += YYTERROR;
	  if (0 <= yyn && yyn <= YYLAST && yycheck[yyn] == YYTERROR)
	    {
	      yyn = yytable[yyn];
	      if (0 < yyn)
		break;
	    }
	}

      /* Pop the current state because it cannot handle the error token.  */
      if (yyssp == yyss)
	YYABORT;


      yydestruct ("Error: popping",
		  yystos[yystate], yyvsp);
      YYPOPSTACK (1);
      yystate = *yyssp;
      YY_STACK_PRINT (yyss, yyssp);
    }

  if (yyn == YYFINAL)
    YYACCEPT;

  *++yyvsp = yylval;


  /* Shift the error token.  */
  YY_SYMBOL_PRINT ("Shifting", yystos[yyn], yyvsp, yylsp);

  yystate = yyn;
  goto yynewstate;


/*-------------------------------------.
| yyacceptlab -- YYACCEPT comes here.  |
`-------------------------------------*/
yyacceptlab:
  yyresult = 0;
  goto yyreturn;

/*-----------------------------------.
| yyabortlab -- YYABORT comes here.  |
`-----------------------------------*/
yyabortlab:
  yyresult = 1;
  goto yyreturn;

#ifndef yyoverflow
/*-------------------------------------------------.
| yyexhaustedlab -- memory exhaustion comes here.  |
`-------------------------------------------------*/
yyexhaustedlab:
  yyerror (YY_("memory exhausted"));
  yyresult = 2;
  /* Fall through.  */
#endif

yyreturn:
  if (yychar != YYEOF && yychar != YYEMPTY)
     yydestruct ("Cleanup: discarding lookahead",
		 yytoken, &yylval);
  /* Do not reclaim the symbols of the rule which action triggered
     this YYABORT or YYACCEPT.  */
  YYPOPSTACK (yylen);
  YY_STACK_PRINT (yyss, yyssp);
  while (yyssp != yyss)
    {
      yydestruct ("Cleanup: popping",
		  yystos[*yyssp], yyvsp);
      YYPOPSTACK (1);
    }
#ifndef yyoverflow
  if (yyss != yyssa)
    YYSTACK_FREE (yyss);
#endif
#if YYERROR_VERBOSE
  if (yymsg != yymsgbuf)
    YYSTACK_FREE (yymsg);
#endif
  /* Make sure YYID is used.  */
  return YYID (yyresult);
}


#line 182 "lang.y"


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

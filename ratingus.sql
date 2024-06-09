PGDMP              	        |            ratingus    16.2    16.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    41563    ratingus    DATABASE     |   CREATE DATABASE ratingus WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE ratingus;
                postgres    false            �            1259    66142    Admins    TABLE     �   CREATE TABLE public."Admins" (
    id integer NOT NULL,
    email character varying(255),
    password character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Admins";
       public         heap    postgres    false            �            1259    66140    Admins_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Admins_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Admins_id_seq";
       public          postgres    false    218            �           0    0    Admins_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Admins_id_seq" OWNED BY public."Admins".id;
          public          postgres    false    217            �            1259    66158    Tokens    TABLE     �   CREATE TABLE public."Tokens" (
    id integer NOT NULL,
    admin integer,
    "refreshToken" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Tokens";
       public         heap    postgres    false            �            1259    66157    Tokens_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Tokens_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Tokens_id_seq";
       public          postgres    false    220            �           0    0    Tokens_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Tokens_id_seq" OWNED BY public."Tokens".id;
          public          postgres    false    219            �            1259    41565    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    full_name character varying(255) NOT NULL,
    birth_date date NOT NULL,
    phone character varying(20),
    department character varying(100),
    rating_position integer NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    41564    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    216            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    215            %           2604    66147 	   Admins id    DEFAULT     j   ALTER TABLE ONLY public."Admins" ALTER COLUMN id SET DEFAULT nextval('public."Admins_id_seq"'::regclass);
 :   ALTER TABLE public."Admins" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            &           2604    66161 	   Tokens id    DEFAULT     j   ALTER TABLE ONLY public."Tokens" ALTER COLUMN id SET DEFAULT nextval('public."Tokens_id_seq"'::regclass);
 :   ALTER TABLE public."Tokens" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            $           2604    41568    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            �          0    66142    Admins 
   TABLE DATA           Q   COPY public."Admins" (id, email, password, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    218   �       �          0    66158    Tokens 
   TABLE DATA           W   COPY public."Tokens" (id, admin, "refreshToken", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    220   �       �          0    41565    users 
   TABLE DATA           ^   COPY public.users (id, full_name, birth_date, phone, department, rating_position) FROM stdin;
    public          postgres    false    216   l       �           0    0    Admins_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Admins_id_seq"', 12, true);
          public          postgres    false    217            �           0    0    Tokens_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Tokens_id_seq"', 11, true);
          public          postgres    false    219            �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 54, true);
          public          postgres    false    215            *           2606    66156    Admins Admins_email_key 
   CONSTRAINT     W   ALTER TABLE ONLY public."Admins"
    ADD CONSTRAINT "Admins_email_key" UNIQUE (email);
 E   ALTER TABLE ONLY public."Admins" DROP CONSTRAINT "Admins_email_key";
       public            postgres    false    218            ,           2606    66154    Admins Admins_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Admins"
    ADD CONSTRAINT "Admins_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Admins" DROP CONSTRAINT "Admins_pkey";
       public            postgres    false    218            .           2606    66163    Tokens Tokens_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Tokens"
    ADD CONSTRAINT "Tokens_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Tokens" DROP CONSTRAINT "Tokens_pkey";
       public            postgres    false    220            (           2606    41570    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            /           2606    66164    Tokens Tokens_admin_fkey    FK CONSTRAINT     |   ALTER TABLE ONLY public."Tokens"
    ADD CONSTRAINT "Tokens_admin_fkey" FOREIGN KEY (admin) REFERENCES public."Admins"(id);
 F   ALTER TABLE ONLY public."Tokens" DROP CONSTRAINT "Tokens_admin_fkey";
       public          postgres    false    218    220    4652            �   �   x�34�L,*I�-NL��ηpH�M���K���T1JR10QI5/��3��5�/��(Lq�O���I5�(wv1��0wM�я
K�qs�+��6w�+�4202�50�5�T02�25�25�351�60�#����� p8&E      �   �   x�]��n�0F��)v�@ڿ��`�,d�`��P1T�u�����s�ala��K�TK�2�P~�8U����<R�u���k�����`_v�u/!n���ɢ���CH��DoL�rsԵ���9�1[D��Qm�f��O�"��|d9'�Ww1R�C:����6��8�ٶߋ�^���E����= �S S�
  �N����mۿ��I�      �   �  x�mRIJ�@]WN�K�����t+�W���_Q
(�"x������7�u'_\�S����+~�?���_��ҡ�{��n�� ��Z��Ԟ�����6V:/CC|�
繁g�x&�V._�;�t�O�s����e R���H�e�V*/��l-��ieT��N����_�=��<8�N{�
�>�.�(���j�C#�%~,ڡ.M��Py�`m��t�N����T�<��w�7,\D#����|-B����ʞ�4-3��!�������<��)������*�����"��_�yT�<����*����~�ð}��U�S[V����E��?�I�C@6�& 9��;x�\¨y>�)+��ek�Ֆ6w�ɇjk���orQ�     
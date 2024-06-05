PGDMP                      |            ratingus    16.2    16.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    41563    ratingus    DATABASE     |   CREATE DATABASE ratingus WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE ratingus;
                postgres    false            �            1259    49756    admins    TABLE     �   CREATE TABLE public.admins (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(100) NOT NULL
);
    DROP TABLE public.admins;
       public         heap    postgres    false            �            1259    49755    admins_id_seq    SEQUENCE     �   CREATE SEQUENCE public.admins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.admins_id_seq;
       public          postgres    false    218            �           0    0    admins_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.admins_id_seq OWNED BY public.admins.id;
          public          postgres    false    217            �            1259    41565    users    TABLE     �   CREATE TABLE public.users (
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
          public          postgres    false    215                        2604    49759 	   admins id    DEFAULT     f   ALTER TABLE ONLY public.admins ALTER COLUMN id SET DEFAULT nextval('public.admins_id_seq'::regclass);
 8   ALTER TABLE public.admins ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218                       2604    41568    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            �          0    49756    admins 
   TABLE DATA           8   COPY public.admins (id, username, password) FROM stdin;
    public          postgres    false    218   A       �          0    41565    users 
   TABLE DATA           ^   COPY public.users (id, full_name, birth_date, phone, department, rating_position) FROM stdin;
    public          postgres    false    216   n       �           0    0    admins_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.admins_id_seq', 1, true);
          public          postgres    false    217            �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 53, true);
          public          postgres    false    215            $           2606    49761    admins admins_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_pkey;
       public            postgres    false    218            &           2606    49763    admins admins_username_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key UNIQUE (username);
 D   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_username_key;
       public            postgres    false    218            "           2606    41570    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            �      x�3�LL���3�442615����� 8�e      �   �  x�mRKN1\ۧ�2�����o�(K3CD�H� 	%��F�t�3��|#�nÌ�E���ի��.0��{Z��r�'���M��(�J���TNj�>��CR��X�=�+Z �)4�c�\��!��%-��v����ZiEO�Z`JRR%i�6Ew�X'}�}dtS�+��K#sܡvN�P[d��t�����#;�&#ZK���	[]Ș��gw��(�I�I=n򼒬��f�L��Ԋ���R��n;�z��t�zŽb;�CQ�����W�B��:�Mu��Ҡn���JF��]��<g.p��5vr�"�
:�����$�z���1�� ���He��m��D��1��M������KjSV�vw�t��6�n�
��!i�[O�roY%}Wt-���m�����)���S:8���"?��?&o��     
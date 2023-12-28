--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: userrole; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.userrole AS ENUM (
    'ADMIN',
    'ARTIST',
    'COMMON'
);


ALTER TYPE public.userrole OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: albums; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.albums (
    id uuid NOT NULL,
    title character varying,
    artist_id uuid
);


ALTER TABLE public.albums OWNER TO postgres;

--
-- Name: artists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.artists (
    id uuid NOT NULL,
    name character varying,
    genre character varying
);


ALTER TABLE public.artists OWNER TO postgres;

--
-- Name: playlists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.playlists (
    id uuid NOT NULL,
    title character varying,
    user_id uuid
);


ALTER TABLE public.playlists OWNER TO postgres;

--
-- Name: ratings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ratings (
    id uuid NOT NULL,
    user_id uuid,
    song_id uuid,
    rating integer
);


ALTER TABLE public.ratings OWNER TO postgres;

--
-- Name: songs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.songs (
    id uuid NOT NULL,
    title character varying,
    artist_id uuid,
    album_id uuid,
    genre character varying,
    length integer
);


ALTER TABLE public.songs OWNER TO postgres;

--
-- Name: songs_playlists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.songs_playlists (
    song_id uuid,
    playlist_id uuid
);


ALTER TABLE public.songs_playlists OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    username character varying,
    email character varying,
    hashed_password character varying,
    role public.userrole,
    interests character varying[]
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: albums; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.albums (id, title, artist_id) FROM stdin;
92f2cd26-4964-44ec-bf04-133071f9faf7	The Shinee World	afb620db-f0d5-4d89-8594-dc76907e5922
dd882d6c-054e-4c02-9e96-514348f13116	HARD	afb620db-f0d5-4d89-8594-dc76907e5922
a676573b-be17-48d4-bd77-39581ad94303	MAMA	61da8484-8e1c-478f-804c-85382ca07c8d
3307a841-9511-4072-8e1f-0a143e30a67c	Overdose	61da8484-8e1c-478f-804c-85382ca07c8d
67c0d63d-cdbe-4739-8110-d764ee4f543a	Love Me Right	47efadae-eb86-4125-937f-f6adce82ccba
b433f7f4-27d9-4e89-92ec-d488fb85f639	EX'ACT	47efadae-eb86-4125-937f-f6adce82ccba
95099aea-9e7b-453d-920b-c7cf4078e4aa	The War	47efadae-eb86-4125-937f-f6adce82ccba
2859fceb-1f4a-4920-ba79-287bb3ff9679	Don't Mess Up My Tempo	47efadae-eb86-4125-937f-f6adce82ccba
e11b0ca3-220b-4c9b-b27c-5e52e155e515	OBSESSION	47efadae-eb86-4125-937f-f6adce82ccba
667bf55d-fb29-4d4b-84b9-22c01ab227c0	Love Shot	47efadae-eb86-4125-937f-f6adce82ccba
d37554b4-64eb-416d-b8fd-a994bf86a8d1	I am WHO	92be7ef8-14a6-4bac-808d-cdaa7967535d
8277e107-6d2d-482d-ad4b-c2c1773b22b5	Clé 2 : Yellow Wood	92be7ef8-14a6-4bac-808d-cdaa7967535d
7631645d-61cb-45c8-82c1-d4c2d25f7455	Clé : LEVANTER	92be7ef8-14a6-4bac-808d-cdaa7967535d
7211c847-502e-4d16-9e08-8dc294329776	MIXTAPE	92be7ef8-14a6-4bac-808d-cdaa7967535d
fb1778c6-b727-4240-9495-167fc60cbbf7	I am NOT	92be7ef8-14a6-4bac-808d-cdaa7967535d
f6e17f04-b55b-4f98-b983-cf8d93039ae6	Clé 1 : MIROH	92be7ef8-14a6-4bac-808d-cdaa7967535d
21905fcb-059e-4082-8887-16e0a68d228c	Dynamite	b82946b6-293f-49d6-8da0-34c92dcca267
527e95ea-731d-4fec-b476-d9bacf3cf216	Butter	b82946b6-293f-49d6-8da0-34c92dcca267
3d7647a6-2caa-464b-a65f-f77e6bacb24b	Permission to Dance	b82946b6-293f-49d6-8da0-34c92dcca267
bb3037d2-1612-473c-98b5-09fb08ce3177	Life Goes On	b82946b6-293f-49d6-8da0-34c92dcca267
8f7d8021-4245-4c5b-a4f9-70059899d12b	The Most Beautiful Moment in Life: Young Forever	b82946b6-293f-49d6-8da0-34c92dcca267
bc6f4fa5-48c3-40a0-a869-84fb88e50586	WINGS	b82946b6-293f-49d6-8da0-34c92dcca267
d7bd051f-ce56-4ebd-b498-10de702de629	Rising Sun	90cf44e0-3a5d-4562-b5a9-a08ba80c2320
b51f599c-8e54-4ce6-a544-3941bd4fc5c1	Formula of Love	04557b23-5ab3-4a9b-ae55-f73bf9afc874
ccb4565f-0ce9-4892-8041-a52ea955cc37	Merry & Happy	04557b23-5ab3-4a9b-ae55-f73bf9afc874
e84e14d4-9a63-4410-9f35-e691001f8048	Twicetagram	04557b23-5ab3-4a9b-ae55-f73bf9afc874
ac690338-712a-4797-ba80-a932a5ed0a36	Coast to Coast	b5e123b6-6d6c-4fee-86a0-63aaf225a404
b6adef8d-b6af-4239-8558-414ea10bed23	Westlife	b5e123b6-6d6c-4fee-86a0-63aaf225a404
f0621ff4-2a63-420b-9d7e-094849a138a9	World of Our Own	b5e123b6-6d6c-4fee-86a0-63aaf225a404
9fb97474-7248-4dd2-a13e-ee06a0a1a904	Face to Face	b5e123b6-6d6c-4fee-86a0-63aaf225a404
b4401419-db04-4f8a-8a4b-d45b418b77b4	Turnaround	b5e123b6-6d6c-4fee-86a0-63aaf225a404
1b051dc8-b248-47c3-b88d-b2a67b89de18	NSYNC	468c5895-fe9d-4ed5-929a-a98ace365ad5
6a1dc587-5348-4a42-a15e-2de2e5c30698	Celebrity	468c5895-fe9d-4ed5-929a-a98ace365ad5
63767528-3a5a-447c-977b-2ef26eb28fe8	No Strings Attached	468c5895-fe9d-4ed5-929a-a98ace365ad5
0f12d450-53a4-4a0a-9c77-bfd4a4d59db6	Random Access Memories	d6a30448-61b5-4af0-a038-c73fb8acdecb
a39d1a4e-da8b-4d27-9285-4cb36b261abe	Bangarang	0ec480d5-ba89-4a3f-a1b7-1a802f0e6e70
cced63a0-ca79-4d4e-b9f4-6893454f139b	A Night at the Opera	9a4425ed-bbda-4038-8fa1-4b33513da4b5
d891d3f0-fc30-4edd-9ce2-e93be5cb79a5	Jazz	9a4425ed-bbda-4038-8fa1-4b33513da4b5
ecd1d6a1-83c2-45b4-8608-22d468c7ab92	Siren Song of the Counter-Culture	ee53fec8-5f41-4a59-b191-da93eac5b224
80cc4cd7-9aa4-40ba-b7d9-1dab074df319	Affirmation	f2e39385-695e-48ad-9867-67fdc22cfa74
c35f6c1a-12e7-4941-b8cd-0f15b2fe10b2	Savage Garden	f2e39385-695e-48ad-9867-67fdc22cfa74
\.


--
-- Data for Name: artists; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.artists (id, name, genre) FROM stdin;
afb620db-f0d5-4d89-8594-dc76907e5922	Shinee	Pop
61da8484-8e1c-478f-804c-85382ca07c8d	EXO-K	Pop
47efadae-eb86-4125-937f-f6adce82ccba	EXO	Pop
92be7ef8-14a6-4bac-808d-cdaa7967535d	Stray Kids	Pop
b82946b6-293f-49d6-8da0-34c92dcca267	BTS	Pop
90cf44e0-3a5d-4562-b5a9-a08ba80c2320	TVXQ	Pop
04557b23-5ab3-4a9b-ae55-f73bf9afc874	TWICE	Pop
b5e123b6-6d6c-4fee-86a0-63aaf225a404	Westlife	R&B
468c5895-fe9d-4ed5-929a-a98ace365ad5	*NSYNC	R&B
d6a30448-61b5-4af0-a038-c73fb8acdecb	Daft Punk	EDM
0ec480d5-ba89-4a3f-a1b7-1a802f0e6e70	Skrillex	EDM
9a4425ed-bbda-4038-8fa1-4b33513da4b5	Queen	Rock
ee53fec8-5f41-4a59-b191-da93eac5b224	Rise Against	Rock
f2e39385-695e-48ad-9867-67fdc22cfa74	Savage Garden	Pop
\.


--
-- Data for Name: playlists; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.playlists (id, title, user_id) FROM stdin;
\.


--
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ratings (id, user_id, song_id, rating) FROM stdin;
\.


--
-- Data for Name: songs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.songs (id, title, artist_id, album_id, genre, length) FROM stdin;
eb0d5ef4-4348-4a20-b191-1cfe0ce2ae6a	Replay	afb620db-f0d5-4d89-8594-dc76907e5922	92f2cd26-4964-44ec-bf04-133071f9faf7	Pop	180000
c18b821c-c9aa-4fb7-9ba4-1fa7b9fad2ca	Love Like Oxygen	afb620db-f0d5-4d89-8594-dc76907e5922	92f2cd26-4964-44ec-bf04-133071f9faf7	Pop	200000
d9d3c5b2-f08f-455d-abe5-7f7201be098a	Last Gift (In My Room - Prelude)	afb620db-f0d5-4d89-8594-dc76907e5922	92f2cd26-4964-44ec-bf04-133071f9faf7	Pop	200000
642c4d87-15c6-4993-bbfe-3b97391f4d2c	Best Place	afb620db-f0d5-4d89-8594-dc76907e5922	92f2cd26-4964-44ec-bf04-133071f9faf7	Pop	200000
991fa3e0-8bbb-4398-a718-449c0645a17f	HARD	afb620db-f0d5-4d89-8594-dc76907e5922	dd882d6c-054e-4c02-9e96-514348f13116	Pop	200000
74e25619-c058-4ecf-ab3d-6022119be9bc	JUICE	afb620db-f0d5-4d89-8594-dc76907e5922	dd882d6c-054e-4c02-9e96-514348f13116	Pop	200000
3f391ee4-52cd-42b1-9ef5-56c562880540	10X	afb620db-f0d5-4d89-8594-dc76907e5922	dd882d6c-054e-4c02-9e96-514348f13116	Pop	200000
08975e66-62c3-49af-a7f9-2c22cd810448	This Feeling	afb620db-f0d5-4d89-8594-dc76907e5922	dd882d6c-054e-4c02-9e96-514348f13116	Pop	200000
739d32b6-3970-4db0-854c-714f4322291d	Machine	61da8484-8e1c-478f-804c-85382ca07c8d	a676573b-be17-48d4-bd77-39581ad94303	Pop	200000
2d52d0da-dfb3-4906-9f74-1c6e53451733	What Is Love	61da8484-8e1c-478f-804c-85382ca07c8d	a676573b-be17-48d4-bd77-39581ad94303	Pop	200000
f46a05f8-4187-4af6-8707-d1edd5840c7c	History	61da8484-8e1c-478f-804c-85382ca07c8d	a676573b-be17-48d4-bd77-39581ad94303	Pop	200000
51b5f4ff-c2c2-4d78-8820-267c4f29f947	Angel	61da8484-8e1c-478f-804c-85382ca07c8d	a676573b-be17-48d4-bd77-39581ad94303	Pop	200000
97b7da03-4b81-410b-9fda-1424274cd69e	Overdose	61da8484-8e1c-478f-804c-85382ca07c8d	3307a841-9511-4072-8e1f-0a143e30a67c	Pop	200000
d78740e5-1315-4e31-b1e1-384cc75770df	Moonlight	61da8484-8e1c-478f-804c-85382ca07c8d	3307a841-9511-4072-8e1f-0a143e30a67c	Pop	200000
daebd07f-22ed-48d6-97ac-d699c78fc057	Thunder	61da8484-8e1c-478f-804c-85382ca07c8d	3307a841-9511-4072-8e1f-0a143e30a67c	Pop	200000
7d27a50f-4ae1-4cae-aba7-e9b5ba730ea5	Run	61da8484-8e1c-478f-804c-85382ca07c8d	3307a841-9511-4072-8e1f-0a143e30a67c	Pop	200000
36e4519b-062f-4a20-849e-c167b9b9cbc1	Love Me Right	47efadae-eb86-4125-937f-f6adce82ccba	67c0d63d-cdbe-4739-8110-d764ee4f543a	Pop	200000
2e15fb62-079c-47d7-883f-3f51f74a6558	Tender Love	47efadae-eb86-4125-937f-f6adce82ccba	67c0d63d-cdbe-4739-8110-d764ee4f543a	Pop	200000
8e8abb31-bff4-4285-8e83-e9b66b5a47fa	Call Me Baby	47efadae-eb86-4125-937f-f6adce82ccba	67c0d63d-cdbe-4739-8110-d764ee4f543a	Pop	200000
2cb03568-c883-479b-8337-f42af794de08	Transformer	47efadae-eb86-4125-937f-f6adce82ccba	67c0d63d-cdbe-4739-8110-d764ee4f543a	Pop	200000
95baeb47-1289-4e17-9fe9-96b2cb8a52e4	Monster	47efadae-eb86-4125-937f-f6adce82ccba	b433f7f4-27d9-4e89-92ec-d488fb85f639	Pop	200000
58354827-1271-4842-ba34-c4ed884cd9f3	Lucky One	47efadae-eb86-4125-937f-f6adce82ccba	b433f7f4-27d9-4e89-92ec-d488fb85f639	Pop	200000
099dc0ca-be9e-4069-9543-7e4b23448474	White Noise	47efadae-eb86-4125-937f-f6adce82ccba	b433f7f4-27d9-4e89-92ec-d488fb85f639	Pop	200000
cb5752a5-695d-4264-9f16-0afa6ab2ad40	One and Only	47efadae-eb86-4125-937f-f6adce82ccba	b433f7f4-27d9-4e89-92ec-d488fb85f639	Pop	200000
4da9a1f2-1164-4354-80dc-34c158f3c555	Ko Ko Bop	47efadae-eb86-4125-937f-f6adce82ccba	95099aea-9e7b-453d-920b-c7cf4078e4aa	Pop	200000
1961a562-71e3-4636-83b0-03c43fa8c299	The Eve	47efadae-eb86-4125-937f-f6adce82ccba	95099aea-9e7b-453d-920b-c7cf4078e4aa	Pop	200000
d4aa05fd-a1ce-4d60-87da-5f8e35514e73	What U do?	47efadae-eb86-4125-937f-f6adce82ccba	95099aea-9e7b-453d-920b-c7cf4078e4aa	Pop	200000
0adf95ec-988a-4976-bffb-e718042a423d	Forever	47efadae-eb86-4125-937f-f6adce82ccba	95099aea-9e7b-453d-920b-c7cf4078e4aa	Pop	200000
4b4df1e2-89a0-4f5e-88b1-0d687dcee97e	Tempo	47efadae-eb86-4125-937f-f6adce82ccba	2859fceb-1f4a-4920-ba79-287bb3ff9679	Pop	200000
57aef955-a07a-44a5-9a2a-cf0ef55db4a0	Sign	47efadae-eb86-4125-937f-f6adce82ccba	2859fceb-1f4a-4920-ba79-287bb3ff9679	Pop	200000
22bf3824-8b17-4f0e-a7dd-be9d96268916	Ooh La La La	47efadae-eb86-4125-937f-f6adce82ccba	2859fceb-1f4a-4920-ba79-287bb3ff9679	Pop	200000
1891a187-b0b2-4667-a627-c8fa97a3673d	Gravity	47efadae-eb86-4125-937f-f6adce82ccba	2859fceb-1f4a-4920-ba79-287bb3ff9679	Pop	200000
b83139da-987e-420a-9b74-d762ca0eb4f0	Obsession	47efadae-eb86-4125-937f-f6adce82ccba	e11b0ca3-220b-4c9b-b27c-5e52e155e515	Pop	200000
8f0b2975-242d-4e20-a18b-23e333d5e0da	Trouble	47efadae-eb86-4125-937f-f6adce82ccba	e11b0ca3-220b-4c9b-b27c-5e52e155e515	Pop	200000
f12cc887-ca35-4eec-b52e-b236227c3263	Jekyll	47efadae-eb86-4125-937f-f6adce82ccba	e11b0ca3-220b-4c9b-b27c-5e52e155e515	Pop	200000
3f599779-46b4-41cc-9a2a-7724d23cb4fa	Groove	47efadae-eb86-4125-937f-f6adce82ccba	e11b0ca3-220b-4c9b-b27c-5e52e155e515	Pop	200000
c322e806-6074-40e2-bdd1-1ce5efde1aec	Love Shot	47efadae-eb86-4125-937f-f6adce82ccba	667bf55d-fb29-4d4b-84b9-22c01ab227c0	Pop	200000
54883ded-a83f-46ee-a19c-6adc778ca371	Trauma	47efadae-eb86-4125-937f-f6adce82ccba	667bf55d-fb29-4d4b-84b9-22c01ab227c0	Pop	200000
2e6d87e3-3e24-453b-a4b8-c6c5d4463c27	Wait	47efadae-eb86-4125-937f-f6adce82ccba	667bf55d-fb29-4d4b-84b9-22c01ab227c0	Pop	200000
cd8c3906-6f14-4433-964d-245a3d14e9ec	Damage	47efadae-eb86-4125-937f-f6adce82ccba	667bf55d-fb29-4d4b-84b9-22c01ab227c0	Pop	200000
367ffbc7-e17d-4d89-865a-12dbd7cf6a83	Youtiful	92be7ef8-14a6-4bac-808d-cdaa7967535d	d37554b4-64eb-416d-b8fd-a994bf86a8d1	Pop	200000
b591a9fd-56ec-43a9-92d9-e6cfdc3783eb	My Pace	92be7ef8-14a6-4bac-808d-cdaa7967535d	d37554b4-64eb-416d-b8fd-a994bf86a8d1	Pop	200000
fb8cac69-480a-4af3-851b-f2ba534988b5	Voices	92be7ef8-14a6-4bac-808d-cdaa7967535d	d37554b4-64eb-416d-b8fd-a994bf86a8d1	Pop	200000
5460f2ca-8eda-41ed-a0af-0331c0274c47	Awkward Silence	92be7ef8-14a6-4bac-808d-cdaa7967535d	d37554b4-64eb-416d-b8fd-a994bf86a8d1	Pop	200000
99f6a2e7-b2b0-43a5-9e77-e693ecb46f2e	Side Effects	92be7ef8-14a6-4bac-808d-cdaa7967535d	8277e107-6d2d-482d-ad4b-c2c1773b22b5	Pop	200000
5b8470e2-7049-4098-bba3-1e4941584bf4	TMT	92be7ef8-14a6-4bac-808d-cdaa7967535d	8277e107-6d2d-482d-ad4b-c2c1773b22b5	Pop	200000
2ca774f3-1763-4ba5-a946-b06ef1d6a743	19	92be7ef8-14a6-4bac-808d-cdaa7967535d	8277e107-6d2d-482d-ad4b-c2c1773b22b5	Pop	200000
c79bb826-1274-4588-ae20-fbeff4b4c219	Road Not Taken	92be7ef8-14a6-4bac-808d-cdaa7967535d	8277e107-6d2d-482d-ad4b-c2c1773b22b5	Pop	200000
f51e7539-8c06-4bfd-bf3d-d5aeb631f0b8	Double Knot	92be7ef8-14a6-4bac-808d-cdaa7967535d	7631645d-61cb-45c8-82c1-d4c2d25f7455	Pop	200000
7b5a9d40-5389-4be5-8ea4-0020d6dff25a	Astronaut	92be7ef8-14a6-4bac-808d-cdaa7967535d	7631645d-61cb-45c8-82c1-d4c2d25f7455	Pop	200000
61641ecf-51d6-40e2-9184-84493eba69a8	Levanter	92be7ef8-14a6-4bac-808d-cdaa7967535d	7631645d-61cb-45c8-82c1-d4c2d25f7455	Pop	200000
48da0b6a-c000-45f3-a478-27a8778d0d74	Booster	92be7ef8-14a6-4bac-808d-cdaa7967535d	7631645d-61cb-45c8-82c1-d4c2d25f7455	Pop	200000
d9ba3432-96d8-40f6-8ec8-2caaebc535b1	Hellevator	92be7ef8-14a6-4bac-808d-cdaa7967535d	7211c847-502e-4d16-9e08-8dc294329776	Pop	200000
6c77e9ea-d2c4-493e-8f60-219e26b1049b	Grrr 총량의 법칙	92be7ef8-14a6-4bac-808d-cdaa7967535d	7211c847-502e-4d16-9e08-8dc294329776	Pop	200000
e011fda4-e5eb-4e49-90be-3b36c464bc33	Young Wings	92be7ef8-14a6-4bac-808d-cdaa7967535d	fb1778c6-b727-4240-9495-167fc60cbbf7	Pop	200000
4794fecf-0362-4aaf-8acd-7b70015fba9f	District 9	92be7ef8-14a6-4bac-808d-cdaa7967535d	fb1778c6-b727-4240-9495-167fc60cbbf7	Pop	200000
4795ad98-5ffe-4ed7-bd05-f782af112732	Mirror	92be7ef8-14a6-4bac-808d-cdaa7967535d	fb1778c6-b727-4240-9495-167fc60cbbf7	Pop	200000
1d043e4b-7188-4a1c-9ae1-856d9dcb3d73	Awaken	92be7ef8-14a6-4bac-808d-cdaa7967535d	fb1778c6-b727-4240-9495-167fc60cbbf7	Pop	200000
b13c3a97-6183-4d25-b156-ae161b815dbf	Miroh	92be7ef8-14a6-4bac-808d-cdaa7967535d	f6e17f04-b55b-4f98-b983-cf8d93039ae6	Pop	200000
0ffa2cd6-296d-4903-8540-bf5926bace95	Victory Song	92be7ef8-14a6-4bac-808d-cdaa7967535d	f6e17f04-b55b-4f98-b983-cf8d93039ae6	Pop	200000
9cccc386-cb23-476c-b4ff-4d82d21eb373	Chronosaurus	92be7ef8-14a6-4bac-808d-cdaa7967535d	f6e17f04-b55b-4f98-b983-cf8d93039ae6	Pop	200000
422441e4-53f8-4d96-ba60-591ac583d6cc	19	92be7ef8-14a6-4bac-808d-cdaa7967535d	f6e17f04-b55b-4f98-b983-cf8d93039ae6	Pop	200000
3e7e44c2-486f-4658-98a6-8b9bbfa9cdbd	Dynamite	b82946b6-293f-49d6-8da0-34c92dcca267	21905fcb-059e-4082-8887-16e0a68d228c	Pop	200000
4d9cf2cc-6c46-4319-9be1-fa4986001caf	Dynamite (Instrumental)	b82946b6-293f-49d6-8da0-34c92dcca267	21905fcb-059e-4082-8887-16e0a68d228c	Pop	200000
3b8c3c84-04b7-4a71-9cff-ad4572e73e5c	Butter	b82946b6-293f-49d6-8da0-34c92dcca267	527e95ea-731d-4fec-b476-d9bacf3cf216	Pop	200000
15939487-a458-495d-b114-ceda6f4771b9	Butter (Instrumental)	b82946b6-293f-49d6-8da0-34c92dcca267	527e95ea-731d-4fec-b476-d9bacf3cf216	Pop	200000
b9725557-c494-40e0-b305-710c6684f65e	Permission to Dance	b82946b6-293f-49d6-8da0-34c92dcca267	3d7647a6-2caa-464b-a65f-f77e6bacb24b	Pop	200000
dd921ddf-61da-4217-b6c2-0277dc51b0af	Permission to Dance (Instrumental)	b82946b6-293f-49d6-8da0-34c92dcca267	3d7647a6-2caa-464b-a65f-f77e6bacb24b	Pop	200000
cafe6756-c6bc-4e27-912c-928b149b1798	Life Goes On	b82946b6-293f-49d6-8da0-34c92dcca267	bb3037d2-1612-473c-98b5-09fb08ce3177	Pop	200000
bb39b68b-7dd1-437a-8039-7aecea631d7a	Life Goes On (Instrumental)	b82946b6-293f-49d6-8da0-34c92dcca267	bb3037d2-1612-473c-98b5-09fb08ce3177	Pop	200000
3aca34b8-8d03-4fc9-994e-9bc5c94845c3	Run	b82946b6-293f-49d6-8da0-34c92dcca267	8f7d8021-4245-4c5b-a4f9-70059899d12b	Pop	200000
2da9c3a9-15fe-4b6b-8293-d445cbbfdefa	Butterfly	b82946b6-293f-49d6-8da0-34c92dcca267	8f7d8021-4245-4c5b-a4f9-70059899d12b	Pop	200000
e8d29d69-9c78-4990-94c8-1e02fd85c83f	Whalien 52	b82946b6-293f-49d6-8da0-34c92dcca267	8f7d8021-4245-4c5b-a4f9-70059899d12b	Pop	200000
e6fabf1d-ffde-45da-b9f5-2787ada614e4	Ma City	b82946b6-293f-49d6-8da0-34c92dcca267	8f7d8021-4245-4c5b-a4f9-70059899d12b	Pop	200000
a2be71af-0350-40b1-bda2-913382f33620	I Need U	b82946b6-293f-49d6-8da0-34c92dcca267	8f7d8021-4245-4c5b-a4f9-70059899d12b	Pop	200000
29929b8e-9e40-4e72-984b-fcc7049b0b95	Save Me	b82946b6-293f-49d6-8da0-34c92dcca267	8f7d8021-4245-4c5b-a4f9-70059899d12b	Pop	200000
2f39b691-a32d-4129-b473-b02cfeba3eb7	Fire	b82946b6-293f-49d6-8da0-34c92dcca267	8f7d8021-4245-4c5b-a4f9-70059899d12b	Pop	200000
adc493c3-ef0e-40dc-918f-36148cfe8a59	Epilogue: Young Forever	b82946b6-293f-49d6-8da0-34c92dcca267	8f7d8021-4245-4c5b-a4f9-70059899d12b	Pop	200000
9b4fc5c9-b334-4cf1-8b5e-5508e5d44880	Blood Sweat & Tears	b82946b6-293f-49d6-8da0-34c92dcca267	bc6f4fa5-48c3-40a0-a869-84fb88e50586	Pop	200000
7e6afe5f-d683-433a-8d97-4ef84ebe7e91	Begin	b82946b6-293f-49d6-8da0-34c92dcca267	bc6f4fa5-48c3-40a0-a869-84fb88e50586	Pop	200000
c46780ba-efaf-4d2b-9ee7-38abed8c661c	Lie	b82946b6-293f-49d6-8da0-34c92dcca267	bc6f4fa5-48c3-40a0-a869-84fb88e50586	Pop	200000
98ac9ba8-09de-4f6d-9c81-33b24185d538	Stigma	b82946b6-293f-49d6-8da0-34c92dcca267	bc6f4fa5-48c3-40a0-a869-84fb88e50586	Pop	200000
c238e3c1-272d-44ef-b34f-ecc8c610e4be	First Love	b82946b6-293f-49d6-8da0-34c92dcca267	bc6f4fa5-48c3-40a0-a869-84fb88e50586	Pop	200000
d75aa72d-fdb0-46ce-9aa7-da6bf7b48700	Reflection	b82946b6-293f-49d6-8da0-34c92dcca267	bc6f4fa5-48c3-40a0-a869-84fb88e50586	Pop	200000
54e59669-b603-4063-bf0f-2fe3f7761934	MAMA	b82946b6-293f-49d6-8da0-34c92dcca267	bc6f4fa5-48c3-40a0-a869-84fb88e50586	Pop	200000
566066c6-ccab-4f7c-813e-5a5bafafe2b8	Awake	b82946b6-293f-49d6-8da0-34c92dcca267	bc6f4fa5-48c3-40a0-a869-84fb88e50586	Pop	200000
07a37c2d-4e15-433e-bb2f-b09e25dc7b14	Lost	b82946b6-293f-49d6-8da0-34c92dcca267	bc6f4fa5-48c3-40a0-a869-84fb88e50586	Pop	200000
9e618de4-f181-4e5f-89e9-e7c787116d6e	BTS Cypher 4	b82946b6-293f-49d6-8da0-34c92dcca267	bc6f4fa5-48c3-40a0-a869-84fb88e50586	Pop	200000
d171cab8-f61e-4d10-837e-7e2c64c8dae4	Am I Wrong	b82946b6-293f-49d6-8da0-34c92dcca267	bc6f4fa5-48c3-40a0-a869-84fb88e50586	Pop	200000
996f4c85-7d05-4647-9c22-b451873cd20f	Tonight	90cf44e0-3a5d-4562-b5a9-a08ba80c2320	d7bd051f-ce56-4ebd-b498-10de702de629	Pop	200000
771a66f1-71dc-4dd2-b3eb-02152a4d27e2	Beautiful Life	90cf44e0-3a5d-4562-b5a9-a08ba80c2320	d7bd051f-ce56-4ebd-b498-10de702de629	Pop	200000
cc5a368c-f04d-4436-85ff-ec1ebb40518d	Rising Sun	90cf44e0-3a5d-4562-b5a9-a08ba80c2320	d7bd051f-ce56-4ebd-b498-10de702de629	Pop	200000
b932cbbc-c8dc-491f-822b-3d1e40fdef5d	Unforgettable	90cf44e0-3a5d-4562-b5a9-a08ba80c2320	d7bd051f-ce56-4ebd-b498-10de702de629	Pop	200000
012f82a9-dd26-497c-acca-0333968357a9	Love Is Never Gone	90cf44e0-3a5d-4562-b5a9-a08ba80c2320	d7bd051f-ce56-4ebd-b498-10de702de629	Pop	200000
0672fb3e-ee07-4147-ba1d-ae7b9baf3161	Love After Love	90cf44e0-3a5d-4562-b5a9-a08ba80c2320	d7bd051f-ce56-4ebd-b498-10de702de629	Pop	200000
713bc9f3-5dba-441e-8c31-7e72b4959eda	Moonlight	04557b23-5ab3-4a9b-ae55-f73bf9afc874	b51f599c-8e54-4ce6-a544-3941bd4fc5c1	Pop	200000
28f0e1c9-f371-4cc1-b19d-68edfe5630d1	Icon	04557b23-5ab3-4a9b-ae55-f73bf9afc874	b51f599c-8e54-4ce6-a544-3941bd4fc5c1	Pop	200000
1025c81a-2a2e-4f70-b8ec-f49b174c85f5	Scientist	04557b23-5ab3-4a9b-ae55-f73bf9afc874	b51f599c-8e54-4ce6-a544-3941bd4fc5c1	Pop	200000
726f3da7-0693-4cd1-be1b-115a5d2ca0f1	Heart Shaker	04557b23-5ab3-4a9b-ae55-f73bf9afc874	ccb4565f-0ce9-4892-8041-a52ea955cc37	Pop	200000
14197ccf-c170-45d7-91fd-e95e2e409254	Merry & Happy	04557b23-5ab3-4a9b-ae55-f73bf9afc874	ccb4565f-0ce9-4892-8041-a52ea955cc37	Pop	200000
1b8050f6-a0b1-43cb-8cca-1b220bba6523	Likey	04557b23-5ab3-4a9b-ae55-f73bf9afc874	e84e14d4-9a63-4410-9f35-e691001f8048	Pop	200000
606761d7-c203-47f4-9a3e-90675543091e	Turtle	04557b23-5ab3-4a9b-ae55-f73bf9afc874	e84e14d4-9a63-4410-9f35-e691001f8048	Pop	200000
afc0b6cc-19ce-4a2c-8df3-0679a51100af	Missing U	04557b23-5ab3-4a9b-ae55-f73bf9afc874	e84e14d4-9a63-4410-9f35-e691001f8048	Pop	200000
d8f4e62a-d200-443a-ab7c-42c9f2045ddd	Wow	04557b23-5ab3-4a9b-ae55-f73bf9afc874	e84e14d4-9a63-4410-9f35-e691001f8048	Pop	200000
ce095593-46e3-4c13-8bb1-e6df21750971	My Love	b5e123b6-6d6c-4fee-86a0-63aaf225a404	ac690338-712a-4797-ba80-a932a5ed0a36	R&B	200000
9877e311-5be5-47f5-af8c-e543635b0749	What Makes a Man	b5e123b6-6d6c-4fee-86a0-63aaf225a404	ac690338-712a-4797-ba80-a932a5ed0a36	R&B	200000
e58023ec-a191-45c9-8f9f-4b1390f41010	I Lay My Love on You	b5e123b6-6d6c-4fee-86a0-63aaf225a404	ac690338-712a-4797-ba80-a932a5ed0a36	R&B	200000
ae18d0f2-c2d3-41d6-afcb-b319043cb3da	I Have a Dream	b5e123b6-6d6c-4fee-86a0-63aaf225a404	ac690338-712a-4797-ba80-a932a5ed0a36	R&B	200000
cb2783cf-9c44-42d4-952e-70fe47359f08	Against All Odds (Take a Look at Me Now)	b5e123b6-6d6c-4fee-86a0-63aaf225a404	ac690338-712a-4797-ba80-a932a5ed0a36	R&B	200000
c2c4c3b2-c551-4e61-a512-8408b31dfe0d	Close	b5e123b6-6d6c-4fee-86a0-63aaf225a404	ac690338-712a-4797-ba80-a932a5ed0a36	R&B	200000
af1f0e33-29ad-4610-8e94-3d589947ec44	Somebody Needs You	b5e123b6-6d6c-4fee-86a0-63aaf225a404	ac690338-712a-4797-ba80-a932a5ed0a36	R&B	200000
c1b15871-a0c8-48f9-99fa-953aadb45036	Angel's Wings	b5e123b6-6d6c-4fee-86a0-63aaf225a404	ac690338-712a-4797-ba80-a932a5ed0a36	R&B	200000
7dc059d7-5e7a-49dd-b078-9119896258a4	Swear It Again	b5e123b6-6d6c-4fee-86a0-63aaf225a404	b6adef8d-b6af-4239-8558-414ea10bed23	R&B	200000
c082686b-9a82-4fd9-949d-bfec244f2a98	If I Let You Go	b5e123b6-6d6c-4fee-86a0-63aaf225a404	b6adef8d-b6af-4239-8558-414ea10bed23	R&B	200000
c1599cee-de37-4cd2-874f-3cec22aa412a	Flying Without Wings	b5e123b6-6d6c-4fee-86a0-63aaf225a404	b6adef8d-b6af-4239-8558-414ea10bed23	R&B	200000
16bde07d-46f8-489d-b6ee-f146490c0261	Fool Again	b5e123b6-6d6c-4fee-86a0-63aaf225a404	b6adef8d-b6af-4239-8558-414ea10bed23	R&B	200000
32d0bf71-ab26-475a-bed7-4909c96d21bb	No No	b5e123b6-6d6c-4fee-86a0-63aaf225a404	b6adef8d-b6af-4239-8558-414ea10bed23	R&B	200000
e4cea75d-ebac-4d81-9dc4-0fbb766179de	I Don't Wanna Fight	b5e123b6-6d6c-4fee-86a0-63aaf225a404	b6adef8d-b6af-4239-8558-414ea10bed23	R&B	200000
94cd8b93-23b6-4939-ad9b-7378cbcdf2f3	Change the World	b5e123b6-6d6c-4fee-86a0-63aaf225a404	b6adef8d-b6af-4239-8558-414ea10bed23	R&B	200000
a1fc6769-5ced-4292-b122-c509f2182d13	Moments	b5e123b6-6d6c-4fee-86a0-63aaf225a404	b6adef8d-b6af-4239-8558-414ea10bed23	R&B	200000
ae0512b8-c7b5-4df6-964c-a099e1afef5f	Queen of My Heart	b5e123b6-6d6c-4fee-86a0-63aaf225a404	f0621ff4-2a63-420b-9d7e-094849a138a9	R&B	200000
a1b50b4d-c34c-48cf-b6b4-f6b8b4fd35ca	Bop Bop Baby	b5e123b6-6d6c-4fee-86a0-63aaf225a404	f0621ff4-2a63-420b-9d7e-094849a138a9	R&B	200000
776372cb-d997-4cbf-a1e4-843cda8df05b	Uptown Girl	b5e123b6-6d6c-4fee-86a0-63aaf225a404	f0621ff4-2a63-420b-9d7e-094849a138a9	R&B	200000
990fc693-1a29-4b9d-9130-3a8d2180447c	Why Do I Love You	b5e123b6-6d6c-4fee-86a0-63aaf225a404	f0621ff4-2a63-420b-9d7e-094849a138a9	R&B	200000
a57d7a14-a4fd-40f5-ad83-634169174756	You Raise Me Up	b5e123b6-6d6c-4fee-86a0-63aaf225a404	9fb97474-7248-4dd2-a13e-ee06a0a1a904	R&B	200000
a472cfe6-ff90-41cb-ad60-8155d25189ce	When You Tell Me That You Love Me	b5e123b6-6d6c-4fee-86a0-63aaf225a404	9fb97474-7248-4dd2-a13e-ee06a0a1a904	R&B	200000
d654200e-aad7-4b22-8290-e79c4dd67d7b	Obvious	b5e123b6-6d6c-4fee-86a0-63aaf225a404	b4401419-db04-4f8a-8a4b-d45b418b77b4	R&B	200000
fbac3a68-48c5-4f8f-8bb1-2fa391e60daf	Hey Whatever	b5e123b6-6d6c-4fee-86a0-63aaf225a404	b4401419-db04-4f8a-8a4b-d45b418b77b4	R&B	200000
0513c2a8-3b6f-418c-924f-13d2bbedc6b0	Amazing	b5e123b6-6d6c-4fee-86a0-63aaf225a404	b4401419-db04-4f8a-8a4b-d45b418b77b4	R&B	200000
e0bccd41-2a2c-487f-b42f-ad1ad3aa57c4	Mandy	b5e123b6-6d6c-4fee-86a0-63aaf225a404	b4401419-db04-4f8a-8a4b-d45b418b77b4	R&B	200000
db7f2e05-09f0-475c-890a-21b4334d504d	Tearin' Up My Heart	468c5895-fe9d-4ed5-929a-a98ace365ad5	1b051dc8-b248-47c3-b88d-b2a67b89de18	R&B	200000
85d00a17-8a24-492a-805f-9190c28cf2d9	I Want You Back	468c5895-fe9d-4ed5-929a-a98ace365ad5	1b051dc8-b248-47c3-b88d-b2a67b89de18	R&B	200000
b655732b-440a-407d-a53c-22e2be901292	God Must Have Spent a Little More Time on You	468c5895-fe9d-4ed5-929a-a98ace365ad5	1b051dc8-b248-47c3-b88d-b2a67b89de18	R&B	200000
718a7e02-d68f-4a1a-ab96-a79114f595e4	Thinking of You (I Drive Myself Crazy)	468c5895-fe9d-4ed5-929a-a98ace365ad5	1b051dc8-b248-47c3-b88d-b2a67b89de18	R&B	200000
b16db06d-9f50-4eea-b45f-c0a110b03f28	Everything I Own	468c5895-fe9d-4ed5-929a-a98ace365ad5	1b051dc8-b248-47c3-b88d-b2a67b89de18	R&B	200000
8cd1bda1-61e9-43a1-b18f-46f0da089e64	I Drive Myself Crazy	468c5895-fe9d-4ed5-929a-a98ace365ad5	1b051dc8-b248-47c3-b88d-b2a67b89de18	R&B	200000
b4cfca5a-5662-47d9-9ea5-dfab54522065	Crazy for You	468c5895-fe9d-4ed5-929a-a98ace365ad5	1b051dc8-b248-47c3-b88d-b2a67b89de18	R&B	200000
729ff641-e0ca-44d9-bff8-ec8818f70a4f	Sailing	468c5895-fe9d-4ed5-929a-a98ace365ad5	1b051dc8-b248-47c3-b88d-b2a67b89de18	R&B	200000
20c0743c-fd77-42b4-a524-c8e364d5eb2c	Falling	468c5895-fe9d-4ed5-929a-a98ace365ad5	6a1dc587-5348-4a42-a15e-2de2e5c30698	R&B	200000
b9e514ea-68e7-4f5a-8099-91ea59514803	The Game Is Over	468c5895-fe9d-4ed5-929a-a98ace365ad5	6a1dc587-5348-4a42-a15e-2de2e5c30698	R&B	200000
affcb947-07bc-4994-a766-83aeb8daf6e7	The Two of Us	468c5895-fe9d-4ed5-929a-a98ace365ad5	6a1dc587-5348-4a42-a15e-2de2e5c30698	R&B	200000
29524448-49b7-4aa2-8752-e04a8f4b48af	Gone	468c5895-fe9d-4ed5-929a-a98ace365ad5	6a1dc587-5348-4a42-a15e-2de2e5c30698	R&B	200000
9e1e5d56-05d2-4d09-b557-635f924dbc77	Bye Bye Bye	468c5895-fe9d-4ed5-929a-a98ace365ad5	63767528-3a5a-447c-977b-2ef26eb28fe8	R&B	200000
f33c5fd4-0f07-4d6a-a139-683ade58f9e6	It's Gonna Be Me	468c5895-fe9d-4ed5-929a-a98ace365ad5	63767528-3a5a-447c-977b-2ef26eb28fe8	R&B	200000
d4c1a0d6-0187-4b55-944c-c5fcbdcb607f	Space Cowboy (Yippie-Yi-Yay)	468c5895-fe9d-4ed5-929a-a98ace365ad5	63767528-3a5a-447c-977b-2ef26eb28fe8	R&B	200000
e2dfd738-7177-4b5b-9577-059f89d9aa80	Just Got Paid	468c5895-fe9d-4ed5-929a-a98ace365ad5	63767528-3a5a-447c-977b-2ef26eb28fe8	R&B	200000
ab48ae99-35d5-476d-8b0c-0bf64b4ce4de	This I Promise You	468c5895-fe9d-4ed5-929a-a98ace365ad5	63767528-3a5a-447c-977b-2ef26eb28fe8	R&B	200000
1450c726-c05d-4879-b5e9-da0fd358f369	Get Lucky	d6a30448-61b5-4af0-a038-c73fb8acdecb	0f12d450-53a4-4a0a-9c77-bfd4a4d59db6	EDM	200000
9a074b77-dd88-4fc9-b11e-77eae23039af	Lose Yourself to Dance	d6a30448-61b5-4af0-a038-c73fb8acdecb	0f12d450-53a4-4a0a-9c77-bfd4a4d59db6	EDM	200000
38f9fc03-f8ac-45c8-bace-369301a41d2b	Touch	d6a30448-61b5-4af0-a038-c73fb8acdecb	0f12d450-53a4-4a0a-9c77-bfd4a4d59db6	EDM	200000
9d1c5929-ea6b-4185-ae1e-d2a3e66e6a3e	Right In	0ec480d5-ba89-4a3f-a1b7-1a802f0e6e70	a39d1a4e-da8b-4d27-9285-4cb36b261abe	EDM	200000
a18e2d7b-4da4-48a1-a804-95d4a3f12ed0	Kyoto	0ec480d5-ba89-4a3f-a1b7-1a802f0e6e70	a39d1a4e-da8b-4d27-9285-4cb36b261abe	EDM	200000
e7710bce-ee9c-4b49-960d-6acf76888e58	Summit	0ec480d5-ba89-4a3f-a1b7-1a802f0e6e70	a39d1a4e-da8b-4d27-9285-4cb36b261abe	EDM	200000
e00c0428-7456-46cd-b24d-32fe3d8645cd	Bangarang	0ec480d5-ba89-4a3f-a1b7-1a802f0e6e70	a39d1a4e-da8b-4d27-9285-4cb36b261abe	EDM	200000
eaa24ab2-eb56-4776-8ea2-628407d134c4	Bohemian Rhapsody	9a4425ed-bbda-4038-8fa1-4b33513da4b5	cced63a0-ca79-4d4e-b9f4-6893454f139b	Rock	200000
9f60febf-df6f-43c8-a393-6d20804766a0	Love of My Life	9a4425ed-bbda-4038-8fa1-4b33513da4b5	cced63a0-ca79-4d4e-b9f4-6893454f139b	Rock	200000
c132e087-8a36-4e59-ad06-d8da80833bb0	I'm in Love with My Car	9a4425ed-bbda-4038-8fa1-4b33513da4b5	cced63a0-ca79-4d4e-b9f4-6893454f139b	Rock	200000
aa6adc96-d12a-4c1a-be76-b0444d210054	Mustapha	9a4425ed-bbda-4038-8fa1-4b33513da4b5	d891d3f0-fc30-4edd-9ce2-e93be5cb79a5	Rock	200000
fd514ac9-a9ce-48d2-ac10-fc9e2e39df47	Jealousy	9a4425ed-bbda-4038-8fa1-4b33513da4b5	d891d3f0-fc30-4edd-9ce2-e93be5cb79a5	Rock	200000
4d79722f-8e3d-40a1-9697-02874df40bfc	Don't Stop Me Now	9a4425ed-bbda-4038-8fa1-4b33513da4b5	d891d3f0-fc30-4edd-9ce2-e93be5cb79a5	Rock	200000
a99ef624-cfdb-480d-b7c1-e0c61697a856	Give It All	ee53fec8-5f41-4a59-b191-da93eac5b224	ecd1d6a1-83c2-45b4-8608-22d468c7ab92	Rock	200000
4e67fd22-3aae-455e-9c2e-c3b1c354dc0c	Dancing for Rain	ee53fec8-5f41-4a59-b191-da93eac5b224	ecd1d6a1-83c2-45b4-8608-22d468c7ab92	Rock	200000
57343cdc-580d-4958-add2-0258c783e6c6	Swing Life Away	ee53fec8-5f41-4a59-b191-da93eac5b224	ecd1d6a1-83c2-45b4-8608-22d468c7ab92	Rock	200000
3e5659c2-55e1-4bb3-9cbb-03ac6c5dc3c7	I Knew I Loved You	f2e39385-695e-48ad-9867-67fdc22cfa74	80cc4cd7-9aa4-40ba-b7d9-1dab074df319	Pop	200000
e3418af5-68b5-4060-948d-43abdb2edf70	The Animal Song	f2e39385-695e-48ad-9867-67fdc22cfa74	80cc4cd7-9aa4-40ba-b7d9-1dab074df319	Pop	200000
b93fcca9-cd79-428e-9c49-c4d8a61340b9	Affirmation	f2e39385-695e-48ad-9867-67fdc22cfa74	80cc4cd7-9aa4-40ba-b7d9-1dab074df319	Pop	200000
c2233066-4435-4ac1-8883-3a766d36c930	Hold Me	f2e39385-695e-48ad-9867-67fdc22cfa74	80cc4cd7-9aa4-40ba-b7d9-1dab074df319	Pop	200000
67622d0f-56d4-4153-a6cc-4f4c8b8f9b60	Crash and Burn	f2e39385-695e-48ad-9867-67fdc22cfa74	80cc4cd7-9aa4-40ba-b7d9-1dab074df319	Pop	200000
7b999c26-95f2-4599-8736-efec0b27f85c	Truly Madly Deeply	f2e39385-695e-48ad-9867-67fdc22cfa74	c35f6c1a-12e7-4941-b8cd-0f15b2fe10b2	Pop	200000
60878ec7-d1b4-4da2-b8e2-29784ec57f8e	I Want You	f2e39385-695e-48ad-9867-67fdc22cfa74	c35f6c1a-12e7-4941-b8cd-0f15b2fe10b2	Pop	200000
2cfe908d-bb3a-47dc-a073-aea328cace3f	To the Moon & Back	f2e39385-695e-48ad-9867-67fdc22cfa74	c35f6c1a-12e7-4941-b8cd-0f15b2fe10b2	Pop	200000
e6d1da1b-0489-4f85-b214-1bec0b7f668e	Break Me Shake Me	f2e39385-695e-48ad-9867-67fdc22cfa74	c35f6c1a-12e7-4941-b8cd-0f15b2fe10b2	Pop	200000
\.


--
-- Data for Name: songs_playlists; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.songs_playlists (song_id, playlist_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, hashed_password, role, interests) FROM stdin;
\.


--
-- Name: albums albums_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.albums
    ADD CONSTRAINT albums_pkey PRIMARY KEY (id);


--
-- Name: artists artists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.artists
    ADD CONSTRAINT artists_pkey PRIMARY KEY (id);


--
-- Name: playlists playlists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.playlists
    ADD CONSTRAINT playlists_pkey PRIMARY KEY (id);


--
-- Name: ratings ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_pkey PRIMARY KEY (id);


--
-- Name: songs songs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: ix_albums_artist_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_albums_artist_id ON public.albums USING btree (artist_id);


--
-- Name: ix_albums_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_albums_id ON public.albums USING btree (id);


--
-- Name: ix_albums_title; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_albums_title ON public.albums USING btree (title);


--
-- Name: ix_artists_genre; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_artists_genre ON public.artists USING btree (genre);


--
-- Name: ix_artists_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_artists_id ON public.artists USING btree (id);


--
-- Name: ix_artists_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_artists_name ON public.artists USING btree (name);


--
-- Name: ix_playlists_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_playlists_id ON public.playlists USING btree (id);


--
-- Name: ix_playlists_title; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_playlists_title ON public.playlists USING btree (title);


--
-- Name: ix_playlists_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_playlists_user_id ON public.playlists USING btree (user_id);


--
-- Name: ix_ratings_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_ratings_id ON public.ratings USING btree (id);


--
-- Name: ix_ratings_rating; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_ratings_rating ON public.ratings USING btree (rating);


--
-- Name: ix_ratings_song_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_ratings_song_id ON public.ratings USING btree (song_id);


--
-- Name: ix_ratings_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_ratings_user_id ON public.ratings USING btree (user_id);


--
-- Name: ix_songs_album_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_songs_album_id ON public.songs USING btree (album_id);


--
-- Name: ix_songs_artist_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_songs_artist_id ON public.songs USING btree (artist_id);


--
-- Name: ix_songs_genre; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_songs_genre ON public.songs USING btree (genre);


--
-- Name: ix_songs_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_songs_id ON public.songs USING btree (id);


--
-- Name: ix_songs_length; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_songs_length ON public.songs USING btree (length);


--
-- Name: ix_songs_playlists_playlist_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_songs_playlists_playlist_id ON public.songs_playlists USING btree (playlist_id);


--
-- Name: ix_songs_playlists_song_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_songs_playlists_song_id ON public.songs_playlists USING btree (song_id);


--
-- Name: ix_songs_title; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_songs_title ON public.songs USING btree (title);


--
-- Name: ix_users_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_users_email ON public.users USING btree (email);


--
-- Name: ix_users_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_users_id ON public.users USING btree (id);


--
-- Name: ix_users_username; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_users_username ON public.users USING btree (username);


--
-- Name: albums albums_artist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.albums
    ADD CONSTRAINT albums_artist_id_fkey FOREIGN KEY (artist_id) REFERENCES public.artists(id) ON DELETE CASCADE;


--
-- Name: playlists playlists_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.playlists
    ADD CONSTRAINT playlists_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: ratings ratings_song_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_song_id_fkey FOREIGN KEY (song_id) REFERENCES public.songs(id) ON DELETE CASCADE;


--
-- Name: ratings ratings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: songs songs_album_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_album_id_fkey FOREIGN KEY (album_id) REFERENCES public.albums(id) ON DELETE CASCADE;


--
-- Name: songs songs_artist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_artist_id_fkey FOREIGN KEY (artist_id) REFERENCES public.artists(id) ON DELETE CASCADE;


--
-- Name: songs_playlists songs_playlists_song_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.songs_playlists
    ADD CONSTRAINT songs_playlists_song_id_fkey FOREIGN KEY (song_id) REFERENCES public.songs(id);


--
-- PostgreSQL database dump complete
--

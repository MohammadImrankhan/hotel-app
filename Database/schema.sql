--
-- PostgreSQL database dump
--

\restrict zCkjJDlgfJ940x8U6ULFyHzIY0XxJL5qrLRamt02p6L5uSuKa9lBr76EjoRs3fa

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-04-17 22:25:14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 250 (class 1255 OID 24601)
-- Name: fn_calculate_booking_price(integer, date, date); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.fn_calculate_booking_price(p_roomid integer, p_checkin date, p_checkout date) RETURNS numeric
    LANGUAGE plpgsql
    AS $$
DECLARE
    total NUMERIC := 0;
    d DATE;
    price NUMERIC;
BEGIN
    d := p_checkin;

    WHILE d < p_checkout LOOP

        SELECT COALESCE(t.price, r.price)
        INTO price
        FROM room r
        LEFT JOIN tariff t
            ON t."RoomId" = r.id
            AND t."IsActive" = B'1'
            AND d BETWEEN t."FromDate" AND t."ToDate"
        WHERE r.id = p_roomid
        LIMIT 1;

        total := total + price;
        d := d + INTERVAL '1 day';

    END LOOP;

    RETURN total;
END;
$$;


ALTER FUNCTION public.fn_calculate_booking_price(p_roomid integer, p_checkin date, p_checkout date) OWNER TO postgres;

--
-- TOC entry 236 (class 1255 OID 16540)
-- Name: fn_get_room_by_id(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.fn_get_room_by_id(p_id integer) RETURNS TABLE(id integer, room_name character varying, description text, roomtypeid integer, room_type character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT r.id, r.name, r.description, r.roomtypeid,rt.name
    FROM rooms r
	 INNER JOIN roomtype rt ON r.roomtypeid = rt.id
    WHERE r.id = p_id;
END;
$$;


ALTER FUNCTION public.fn_get_room_by_id(p_id integer) OWNER TO postgres;

--
-- TOC entry 235 (class 1255 OID 16539)
-- Name: fn_get_rooms(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.fn_get_rooms() RETURNS TABLE(id integer, room_name character varying, description text, roomtypeid integer, room_type character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT r.id, r.name, r.description, r.roomtypeid,rt.name
    FROM rooms r
	  INNER JOIN roomtype rt ON r.roomtypeid = rt.id
    ORDER BY r.id;
END;
$$;


ALTER FUNCTION public.fn_get_rooms() OWNER TO postgres;

--
-- TOC entry 234 (class 1255 OID 16536)
-- Name: fn_insert_room(character varying, text, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.fn_insert_room(p_name character varying, p_description text, p_roomtypeid integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
    new_id INT;
BEGIN
    INSERT INTO rooms(name, description, roomtypeid)
    VALUES (p_name, p_description, p_roomtypeid)
    RETURNING id INTO new_id;

    RETURN new_id;
END;
$$;


ALTER FUNCTION public.fn_insert_room(p_name character varying, p_description text, p_roomtypeid integer) OWNER TO postgres;

--
-- TOC entry 249 (class 1255 OID 16543)
-- Name: fn_room_crud(text, integer, character varying, text, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.fn_room_crud(p_action text, p_id integer DEFAULT NULL::integer, p_name character varying DEFAULT NULL::character varying, p_description text DEFAULT NULL::text, p_roomtypeid integer DEFAULT NULL::integer) RETURNS TABLE(id integer, room_name character varying, description text, roomtypeid integer, room_type character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN

    -- INSERT
    IF p_action = 'INSERT' THEN

        INSERT INTO rooms(name, description, roomtypeid)
        VALUES (p_name, p_description, p_roomtypeid);

        RETURN QUERY
        SELECT 
            r.id,
            r.name AS room_name,
            r.description,
            r.roomtypeid,
            rt.name AS room_type
        FROM rooms r
        INNER JOIN roomtype rt ON r.roomtypeid = rt.id
        ORDER BY r.id DESC
        LIMIT 1;

    -- UPDATE
    ELSIF p_action = 'UPDATE' THEN
        
        UPDATE rooms r
        SET name = p_name,
            description = p_description,
            roomtypeid = p_roomtypeid
        WHERE r.id = p_id;

        RETURN QUERY
        SELECT 
            r.id,
            r.name AS room_name,
            r.description,
            r.roomtypeid,
            rt.name AS room_type
        FROM rooms r
        INNER JOIN roomtype rt ON r.roomtypeid = rt.id
        WHERE r.id = p_id;

    -- DELETE
    ELSIF p_action = 'DELETE' THEN

        DELETE FROM rooms r WHERE r.id = p_id;

        RETURN QUERY
        SELECT 
            r.id,
            r.name AS room_name,
            r.description,
            r.roomtypeid,
            rt.name AS room_type
        FROM rooms r
        INNER JOIN roomtype rt ON r.roomtypeid = rt.id;

    -- SELECT
    ELSIF p_action = 'SELECT' THEN
          RETURN QUERY 
		 SELECT r.id, r.name, r.description, r.roomtypeid,rt.name
         FROM rooms r
	     INNER JOIN roomtype rt ON r.roomtypeid = rt.id
         WHERE (p_roomtypeid IS NULL OR r.roomtypeid = p_roomtypeid);
    END IF;

END;
$$;


ALTER FUNCTION public.fn_room_crud(p_action text, p_id integer, p_name character varying, p_description text, p_roomtypeid integer) OWNER TO postgres;

--
-- TOC entry 232 (class 1255 OID 16471)
-- Name: fn_save_feedback(text, text, text, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.fn_save_feedback(p_name text, p_email text, p_message text, p_rating integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO feedback(name, email, message, rating)
    VALUES (p_name, p_email, p_message, p_rating);

    RETURN 1;
END;
$$;


ALTER FUNCTION public.fn_save_feedback(p_name text, p_email text, p_message text, p_rating integer) OWNER TO postgres;

--
-- TOC entry 251 (class 1255 OID 32772)
-- Name: fn_tariff_crud(text, integer, integer, numeric, character varying, date, date, boolean); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.fn_tariff_crud(p_action text, p_id integer DEFAULT NULL::integer, p_roomid integer DEFAULT NULL::integer, p_price numeric DEFAULT NULL::numeric, p_season character varying DEFAULT NULL::character varying, p_fromdate date DEFAULT NULL::date, p_todate date DEFAULT NULL::date, p_isactive boolean DEFAULT NULL::boolean) RETURNS TABLE(id integer, roomid integer, roomname character varying, price numeric, season character varying, fromdate date, todate date, isactive boolean, imageurl text)
    LANGUAGE plpgsql
    AS $$
BEGIN

    IF p_action = 'SELECT' THEN
        RETURN QUERY
        SELECT 
            t.id,
			r.id as roomid,
            r."name"      AS roomname,     
            t.price,
            t.season,
            t."FromDate"    AS fromdate,   
            t."ToDate"      AS todate,     
            t."IsActive"    AS isactive    ,
			img.url AS imageurl
        FROM tariff t
		inner join rooms r on r.id=t."RoomId"
		 LEFT JOIN LATERAL (
        SELECT i.url
        FROM images i
        WHERE i.roomid = r.id
        ORDER BY i.id ASC   -- or created_at DESC
        LIMIT 1
    	) img ON TRUE
        WHERE (p_roomid IS NULL OR t."RoomId" = p_roomid)
        ORDER BY t.id DESC;

    ELSIF p_action = 'SELECTBYID' THEN
        RETURN QUERY
        SELECT 
            t.id,
					r.id as roomid,
            r."name"      AS roomname,   
            t.price,
            t.season,
            t."FromDate" AS fromdate,
            t."ToDate" AS todate,
            t."IsActive" AS isactive,
			img.url AS imageurl
        FROM tariff t
		inner join rooms r on r.id=t."RoomId"
		 LEFT JOIN LATERAL (
        SELECT i.url
        FROM images i
        WHERE i.roomid = r.id
        ORDER BY i.id ASC   -- or created_at DESC
        LIMIT 1
    	) img ON TRUE
        WHERE t.id = p_id;

    ELSIF p_action = 'INSERT' THEN
        INSERT INTO tariff ("RoomId", price, season, "FromDate", "ToDate", "IsActive")
        VALUES (p_roomid, p_price, p_season, p_fromdate, p_todate, p_isactive);

        RETURN QUERY
        SELECT * FROM fn_tariff_crud('SELECT', NULL, p_roomid);

    ELSIF p_action = 'UPDATE' THEN
        UPDATE tariff
        SET 
            "RoomId" = p_roomid,
            price = p_price,
            season = p_season,
            "FromDate" = p_fromdate,
            "ToDate" = p_todate,
            "IsActive" = p_isactive
        WHERE id = p_id;

        RETURN QUERY
        SELECT * FROM fn_tariff_crud('SELECTBYID', p_id);

    ELSIF p_action = 'DELETE' THEN
        DELETE FROM tariff WHERE id = p_id;

        RETURN QUERY
        SELECT 
            NULL::INT,
            NULL::INT,
            NULL::NUMERIC,
            NULL::VARCHAR,
            NULL::DATE,
            NULL::DATE,
            NULL::boolean;
    END IF;

END;
$$;


ALTER FUNCTION public.fn_tariff_crud(p_action text, p_id integer, p_roomid integer, p_price numeric, p_season character varying, p_fromdate date, p_todate date, p_isactive boolean) OWNER TO postgres;

--
-- TOC entry 237 (class 1255 OID 16541)
-- Name: fn_update_room(integer, character varying, text, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.fn_update_room(p_id integer, p_name character varying, p_description text, p_roomtypeid integer) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
BEGIN
    UPDATE rooms
    SET 
        name = p_name,
        description = p_description,
        roomtypeid = p_roomtypeid
    WHERE id = p_id;

    IF FOUND THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
$$;


ALTER FUNCTION public.fn_update_room(p_id integer, p_name character varying, p_description text, p_roomtypeid integer) OWNER TO postgres;

--
-- TOC entry 231 (class 1255 OID 16459)
-- Name: fn_user_login(text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.fn_user_login(p_username text, p_password text) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
    user_exists INTEGER;
BEGIN
    SELECT 1 INTO user_exists
    FROM users
    WHERE lower(username) = lower(p_username)
      AND passwordhash = p_password
    LIMIT 1;

    IF user_exists = 1 THEN
        RETURN 1; -- success
    ELSE
        RETURN 0; -- fail
    END IF;
END;
$$;


ALTER FUNCTION public.fn_user_login(p_username text, p_password text) OWNER TO postgres;

--
-- TOC entry 233 (class 1255 OID 16531)
-- Name: get_images_with_room_details(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_images_with_room_details() RETURNS TABLE(image_id integer, image_url text, created_at timestamp without time zone, room_name character varying, room_type character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT 
        i.id,   
        i.url,
        i.created_at,
        r.name,
        rt.name 
    FROM images i
    INNER JOIN rooms r ON i.roomid = r.id
    INNER JOIN roomtype rt ON r.roomtypeid = rt.id;
END;
$$;


ALTER FUNCTION public.get_images_with_room_details() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 224 (class 1259 OID 16461)
-- Name: feedback; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.feedback (
    id integer NOT NULL,
    name character varying(100),
    email character varying(100),
    message text,
    rating integer,
    createdon timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.feedback OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16460)
-- Name: feedback_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.feedback_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.feedback_id_seq OWNER TO postgres;

--
-- TOC entry 5075 (class 0 OID 0)
-- Dependencies: 223
-- Name: feedback_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.feedback_id_seq OWNED BY public.feedback.id;


--
-- TOC entry 227 (class 1259 OID 16501)
-- Name: images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.images (
    id integer NOT NULL,
    roomid integer NOT NULL,
    url text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.images OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16500)
-- Name: images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.images_id_seq OWNER TO postgres;

--
-- TOC entry 5076 (class 0 OID 0)
-- Dependencies: 226
-- Name: images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.images_id_seq OWNED BY public.images.id;


--
-- TOC entry 219 (class 1259 OID 16431)
-- Name: rooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rooms (
    id integer NOT NULL,
    name character varying(100),
    description text,
    roomtypeid integer CONSTRAINT "rooms_roomTypeID_not_null" NOT NULL
);


ALTER TABLE public.rooms OWNER TO postgres;

--
-- TOC entry 5077 (class 0 OID 0)
-- Dependencies: 219
-- Name: COLUMN rooms.roomtypeid; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.rooms.roomtypeid IS 'room type id like standard';


--
-- TOC entry 220 (class 1259 OID 16437)
-- Name: rooms_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rooms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rooms_id_seq OWNER TO postgres;

--
-- TOC entry 5078 (class 0 OID 0)
-- Dependencies: 220
-- Name: rooms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rooms_id_seq OWNED BY public.rooms.id;


--
-- TOC entry 228 (class 1259 OID 16535)
-- Name: rooms_id_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.rooms ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.rooms_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 225 (class 1259 OID 16487)
-- Name: roomtype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roomtype (
    id integer DEFAULT nextval('public.rooms_id_seq'::regclass) NOT NULL,
    name character varying(100),
    description text
);


ALTER TABLE public.roomtype OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 24595)
-- Name: tariff; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tariff (
    id integer NOT NULL,
    price numeric(10,2),
    season character varying(50),
    "RoomId" integer,
    "FromDate" date,
    "ToDate " date,
    "IsActive" boolean,
    "ToDate" date
);


ALTER TABLE public.tariff OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 24594)
-- Name: tariff_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tariff ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tariff_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 16438)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50),
    passwordhash text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16444)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5079 (class 0 OID 0)
-- Dependencies: 222
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4892 (class 2604 OID 16464)
-- Name: feedback id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedback ALTER COLUMN id SET DEFAULT nextval('public.feedback_id_seq'::regclass);


--
-- TOC entry 4895 (class 2604 OID 16504)
-- Name: images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images ALTER COLUMN id SET DEFAULT nextval('public.images_id_seq'::regclass);


--
-- TOC entry 4891 (class 2604 OID 16447)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5063 (class 0 OID 16461)
-- Dependencies: 224
-- Data for Name: feedback; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.feedback (id, name, email, message, rating, createdon) FROM stdin;
1	imr	f@gmail.com	An absolutely transcendent experience. The attention to detail in every room, from the hand-stitched linens to the bespoke toiletries,\n\tspeaks of a property that truly understands luxury. The staff remembered our preferences from day one.	3	2026-04-04 09:29:23.732922
2	imran	iku@gmail.com	An absolutely transcendent experience. The attention to detail in every room, from the hand-stitched linens to the bespoke toiletries,\n\tspeaks of a property that truly understands luxury. The staff remembered our preferences from day one.	5	2026-04-06 12:07:29.582434
3	cb	IKURESHI3@GMAIL.COM	cvbc	3	2026-04-12 15:21:02.862606
4	xfgfg	IKURESHI3@GMAIL.COM	cvbcv	3	2026-04-12 15:21:52.592759
\.


--
-- TOC entry 5066 (class 0 OID 16501)
-- Dependencies: 227
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.images (id, roomid, url, created_at) FROM stdin;
14	1	/uploads/room_1/cfcfd2f8-bbee-4974-91d0-a3b49a778c36.jpeg	2026-04-04 15:57:37.61344
15	4	/uploads/room_4/8ed02e1d-8e48-4d55-9872-c07ddcd3d68a.jpeg	2026-04-04 15:57:57.221488
16	3	/uploads/room_3/7d04fba2-3973-4d9b-a5db-4022faf2f80c.jpeg	2026-04-04 15:58:08.024405
19	1	/uploads/room_1/c0e2cece-ecf6-49aa-ad6e-f7664072630c.jpg	2026-04-07 16:43:42.058863
\.


--
-- TOC entry 5058 (class 0 OID 16431)
-- Dependencies: 219
-- Data for Name: rooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rooms (id, name, description, roomtypeid) FROM stdin;
3	Room1	this is cottage room	2
4	Room2	this is cottage room	2
5	Room1	this is Family room	3
1	Room1	this is standrad roomimran	1
\.


--
-- TOC entry 5064 (class 0 OID 16487)
-- Dependencies: 225
-- Data for Name: roomtype; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roomtype (id, name, description) FROM stdin;
1	Standard	\N
2	COTTAGE ROOMS	
3	FAMILY COTTAGE	
\.


--
-- TOC entry 5069 (class 0 OID 24595)
-- Dependencies: 230
-- Data for Name: tariff; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tariff (id, price, season, "RoomId", "FromDate", "ToDate ", "IsActive", "ToDate") FROM stdin;
1	234.00	xdf	1	2026-04-06	\N	t	2026-04-07
2	2000.00	Jan to April	4	2026-01-01	\N	t	2026-04-30
\.


--
-- TOC entry 5060 (class 0 OID 16438)
-- Dependencies: 221
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, passwordhash) FROM stdin;
1	Admin	dddeab9167689505f847975b0928b55895575b73abeebd1fbdb349e697b4dcf14dded82bd71af22cde0e210c1f59481b5c8939b2e88d667424d831f40f406a17
\.


--
-- TOC entry 5080 (class 0 OID 0)
-- Dependencies: 223
-- Name: feedback_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.feedback_id_seq', 4, true);


--
-- TOC entry 5081 (class 0 OID 0)
-- Dependencies: 226
-- Name: images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.images_id_seq', 19, true);


--
-- TOC entry 5082 (class 0 OID 0)
-- Dependencies: 220
-- Name: rooms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rooms_id_seq', 1, true);


--
-- TOC entry 5083 (class 0 OID 0)
-- Dependencies: 228
-- Name: rooms_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rooms_id_seq1', 3, true);


--
-- TOC entry 5084 (class 0 OID 0)
-- Dependencies: 229
-- Name: tariff_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tariff_id_seq', 2, true);


--
-- TOC entry 5085 (class 0 OID 0)
-- Dependencies: 222
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- TOC entry 4902 (class 2606 OID 16470)
-- Name: feedback feedback_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_pkey PRIMARY KEY (id);


--
-- TOC entry 4906 (class 2606 OID 16512)
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);


--
-- TOC entry 4898 (class 2606 OID 16451)
-- Name: rooms rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (id);


--
-- TOC entry 4904 (class 2606 OID 16495)
-- Name: roomtype roomtype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roomtype
    ADD CONSTRAINT roomtype_pkey PRIMARY KEY (id);


--
-- TOC entry 4908 (class 2606 OID 24600)
-- Name: tariff tariff_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tariff
    ADD CONSTRAINT tariff_pkey PRIMARY KEY (id);


--
-- TOC entry 4900 (class 2606 OID 16453)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4909 (class 2606 OID 16513)
-- Name: images fk_images_room; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT fk_images_room FOREIGN KEY (roomid) REFERENCES public.rooms(id) ON DELETE CASCADE;


--
-- TOC entry 4910 (class 2606 OID 16544)
-- Name: images fk_room; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT fk_room FOREIGN KEY (roomid) REFERENCES public.rooms(id) ON DELETE CASCADE;


-- Completed on 2026-04-17 22:25:15

--
-- PostgreSQL database dump complete
--

\unrestrict zCkjJDlgfJ940x8U6ULFyHzIY0XxJL5qrLRamt02p6L5uSuKa9lBr76EjoRs3fa


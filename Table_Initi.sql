DROP TABLE if exists db1.timetable;
DROP TABLE IF exists db1.time;
DROP TABLE IF exists db1.capabilities;
DROP TABLE IF exists db1.user;
DROP TABLE IF exists db1.courses;

create Table db1.user(
username varchar(255) not null,
password varchar(255) not null,
name varchar(255),
primary key(username)
);
create Table db1.courses(
courseID varchar(255) not null,
primary key (courseID)
);
create Table db1.capabilities(
username varchar(255),
courseID varchar(255),
grade varchar(3) not null,
  FOREIGN KEY (username) REFERENCES db1.user(username),
  foreign key (courseID) references db1.courses(courseID)
);

create Table db1.time(
username varchar(255) not null,
date timestamp Not null,
timeID int auto_increment,
time timestamp Not null,
primary key (timeID),
foreign key (username) references db1.user(username)
);

create Table db1.timetable(
username varchar(255) not null,
date timestamp Not null,
timeID int Not null,
courseID varchar(225) not null,
foreign key (courseID) references db1.courses(courseID),
foreign key (username) references db1.user(username),
foreign key (timeID) references db1.time(timeID)
);
insert into db1.user (username,password,name) values ("1","1","1123213");
Insert into db1.courses (courseID) values ("BIOSCI 107"),("MATH 108"),("BIOSCI 101"),("COMPSCI 101"),("COMPSCI 105");

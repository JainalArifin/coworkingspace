import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import { Section, SectionAlternate } from 'components/organisms';
import {
  Categories,
  Courses,
  Hero,
  SectionInformation,
  Reviews,
  Subscription,
} from './components';
import { SERVICES } from '../../configs';
import axios from 'axios';
import { colors } from '@material-ui/core';

import {
  promoNumbers,
  courseCategories,
  popularCourses,
  reviews,
} from './data';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
  },
  coursesSection: {
    maxWidth: 800,
    margin: '0 auto',
  },
  paddingBottom0: {
    paddingBottom: 0,
  },
  sectionAlternate: {
    background: 'transparent',
    backgroundImage: `linear-gradient(180deg, #ffffff 40%, ${theme.palette.primary.dark} 0%)`,
  },
}));

const Classroom = () => {
  const classes = useStyles();
  const [dataClass, setDataClass] = useState([]);
  const [loadingClass, setLoadingClass] = useState(false);
  const [errorClass, setErrorClass] = useState('');
  const [online, setOnline] = useState(true);
  const [category, setCategory] = useState('');

  const [dataTrainer, setDataTrainer] = useState([]);
  const [dataStudent, setDataStudent] = useState([]);

  const getDataClass = (online, category) => {
    setLoadingClass(true);
    axios
      .get(SERVICES.GET_CLASS, {
        params: {
          online,
          category,
        },
      })
      .then(({ data }) => {
        setDataClass(data);
        setLoadingClass(false);
      })
      .catch(err => setErrorClass(err));
  };

  const getDataTrainer = () => {
    axios
      .get(SERVICES.GET_TRAINER)
      .then(({ data }) => {
        setDataTrainer(data);
      })
      .catch(err => setDataTrainer(err));
  };

  const getDataStudent = () => {
    axios
      .get(SERVICES.GET_MEMBER, {
        params: {
          role: 'member',
        },
      })
      .then(({ data }) => {
        setDataStudent(data);
      })
      .catch(err => setDataStudent(err));
  };

  useEffect(() => {
    getDataClass(online);
    getDataTrainer();
    getDataStudent();
  }, []);

  console.log({ dataStudent });
  const dataLIst = [
    {
      loading: loadingClass,
      color: colors.blue,
      icon: 'fas fa-graduation-cap',
      total: dataClass.total_data,
      subtitle: 'Kelas',
      description: 'Pilih dari lebih dari 1000+ kursus video online.',
    },
    {
      loading: loadingClass,
      color: colors.purple,
      icon: 'fas fa-book',
      total: dataTrainer.total_data,
      subtitle: 'Expert Instructors',
      description:
        'Instruktur ahli untuk memastikan kursus berjalan dengan baik.',
    },
    {
      loading: loadingClass,
      color: colors.pink,
      icon: 'fas fa-user-graduate',
      total: dataStudent.data && dataStudent.data.length,
      subtitle: 'Active Students',
      description: 'SIswa bisa aktif dimanapun.',
    },
  ];

  const handleChangeOnline = (online, category) => {
    setOnline(online);
    getDataClass(online, category);
  };

  const handleChangeCategory = (online, category) => {
    console.log({ online, category });
    setCategory(category);
    getDataClass(online, category);
  };

  return (
    <div className={classes.root}>
      <Hero />
      <Section>
        <SectionInformation data={dataLIst} />
      </Section>
      <SectionAlternate>
        <Courses
          handleChangeOnline={handleChangeOnline}
          handleChangeCategory={handleChangeCategory}
          category={category}
          online={online}
          data={dataClass}
          loading={loadingClass}
          error={errorClass}
          className={classes.coursesSection}
        />
      </SectionAlternate>
    </div>
  );
};

export default Classroom;

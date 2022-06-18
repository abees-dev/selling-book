import {
  FormProvider,
  RHFEditor,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadSingleFile,
} from '@/components/hook-form';
import { fData } from '@/utils/formatNumber';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Stack, Typography } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import axios from '@/utils/axios';
import { useSnackbar } from 'notistack';

const CourseNewEditForm = ({ isEdit = false, currentCourse, onSuccess }) => {
  const BookSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    price: Yup.number().required('Price is required'),
    author: Yup.string().required('Author is required'),
    duration: Yup.number().required('Duration is required'),
    certificate: Yup.boolean(),
    instructor: Yup.string().required('Instructor is required'),
    assess: Yup.string().required('Assess is required'),
    language: Yup.string().required('Language is required'),
    details: Yup.string().required('Details is required'),
    imageUrl: Yup.mixed().required('Image is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentCourse?.title || 'The Three Musketeers',
      author: currentCourse?.author || 'Alexandre Dumas',
      price: currentCourse?.price || 40,
      duration: currentCourse?.duration || 10,
      certificate: currentCourse?.certificate || true,
      instructor: currentCourse?.instructor || 'John Doe',
      assess: currentCourse?.assess || 'Lifetime',
      language: currentCourse?.language || 'English',
      details: currentCourse?.details || '',
      imageUrl: currentCourse?.imageUrl || '',
    }),
    [currentCourse]
  );

  const methods = useForm({
    resolver: yupResolver(BookSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const formData = new FormData();

  const { enqueueSnackbar } = useSnackbar();

  const accessToken = localStorage.getItem('accessToken');

  const onSubmit = async (data) => {
    formData.append('title', data.title);
    formData.append('price', data.price);
    formData.append('author', data.author);
    formData.append('duration', data.duration);
    formData.append('certificate', data.certificate);
    formData.append('assess', data.assess);
    formData.append('instructor', data.instructor);
    formData.append('language', data.language);
    formData.append('details', data.details);
    formData.append('imageUrl', data.imageUrl);

    try {
      if (!isEdit) {
        const response = await axios.post('api/course/create-course', formData);
        onSuccess(response.data);
      } else {
        const id = currentCourse._id;

        const response = await axios.post('api/course/update-course', formData, {
          params: { id },
        });
        console.log(response);
        onSuccess(response.data, id);
      }
      enqueueSnackbar(isEdit ? 'Course updated successfully' : 'Course created successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'imageUrl',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const LANGUAGE = [
    {
      id: '1',
      label: 'Vietnamese',
    },
    {
      id: '2',
      label: 'English',
    },
  ];

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'grid',
            columnGap: 2,
            rowGap: 3,
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
          }}
        >
          <RHFTextField name="title" label="Title" />
          <RHFTextField name="author" label="Author" />
          <RHFTextField name="price" label="Price" />
          <RHFTextField name="instructor" label="Instructor" />
          <RHFTextField name="duration" label="Duration" />
          <RHFSelect name="language" label="Language" placeholder="Language">
            <option value="" />
            {LANGUAGE.map((option) => (
              <option key={option.id} value={option.label}>
                {option.label}
              </option>
            ))}
          </RHFSelect>
          <RHFTextField name="assess" label="Access" />
        </Box>
        <Box sx={{ mt: 3 }}>
          <RHFSwitch name="certificate" label="Certificate" />
        </Box>
      </Card>
      <Stack sx={{ width: 1, mt: 3 }}>
        <RHFEditor name="details" simple />

        <Box sx={{ mb: 3 }}>
          <RHFUploadSingleFile
            name="imageUrl"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
            helperText={
              <Typography
                variant="caption"
                sx={{
                  mt: 2,
                  mx: 'auto',
                  display: 'block',
                  textAlign: 'center',
                  color: 'text.secondary',
                }}
              >
                Allowed *.jpeg, *.jpg, *.png, *.gif
                <br /> max size of {fData(3145728)}
              </Typography>
            }
          />
        </Box>
        <Stack alignItems="flex-end" sx={{ mt: 3, mb: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {!isEdit ? 'Create course' : 'Save Changes'}
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default CourseNewEditForm;

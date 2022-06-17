import { FormProvider, RHFSelect, RHFTextField, RHFUploadAvatar } from '@/components/hook-form';
import { fData } from '@/utils/formatNumber';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import axios from '@/utils/axios';
import { useSnackbar } from 'notistack';

const BookNewEditForm = ({ isEdit = false, currentBook, onSuccess }) => {
  const BookSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    subtitle: Yup.string().required('Subtitle is required'),
    price: Yup.number().required('Price is required'),
    author: Yup.string().required('Author is required'),
    unit: Yup.string(),
    imageUrl: Yup.mixed().required('Image is required'),
  });

  console.log(currentBook);
  const defaultValues = useMemo(
    () => ({
      title: currentBook?.title || 'The Three Musketeers',
      subtitle: currentBook?.subtitle || 'The Three Musketeers, by Alexandre Dumas',
      price: currentBook?.price || 40,
      author: currentBook?.author || 'Alexandre Dumas',
      description: currentBook?.description || 'Desc',
      unit: currentBook?.unit || 'Books',
      booksType: currentBook?.booksType || 'Kindergarten',
      imageUrl: currentBook?.imageUrl || null,
    }),
    [currentBook]
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
    formData.append('subtitle', data.subtitle);
    formData.append('price', data.price);
    formData.append('author', data.author);
    formData.append('description)', data.description);
    formData.append('unit', data.unit);
    formData.append('booksType', data.booksType);
    formData.append('imageUrl', data.imageUrl);

    try {
      if (!isEdit) {
        const res = await axios.post('/api/books/create', formData, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        onSuccess(res.book);
      } else {
        const id = currentBook._id;
        const res = await axios.post('/api/books/update', formData, {
          params: {
            id,
          },
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        onSuccess(res.book, id);
      }
      enqueueSnackbar(isEdit ? 'Book updated successfully' : 'Book created successfully');
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
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

  const BOOK_TYPE = [
    {
      id: '1',
      label: 'Kindergarten',
    },
    {
      id: '2',
      label: 'High school',
    },
    {
      id: '3',
      label: 'College',
    },
  ];

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
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
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="title" label="Name" />
              <RHFTextField name="subtitle" label="Subtitle" />
              <RHFTextField name="price" label="Price" />

              <RHFTextField name="author" label="Author" />
              <RHFTextField name="unit" label="unit" />
              <RHFSelect name="booksType" label="Books type" placeholder="Country">
                <option value="" />
                {BOOK_TYPE.map((option) => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="description" label="Description" fullWidth />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create book' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default BookNewEditForm;

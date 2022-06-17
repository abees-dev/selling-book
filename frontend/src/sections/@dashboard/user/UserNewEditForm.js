import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
// _mock
// components
import { FormProvider, RHFSelect, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';
import axios from '@/utils/axios';

// ----------------------------------------------------------------------

UserNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function UserNewEditForm({ isEdit, currentUser, onSuccess }) {
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    fullName: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('country is required'),
    company: Yup.string().required('Company is required'),
    region: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    role: Yup.string().required('Role Number is required'),
    // imageUrl: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
  });

  const defaultValues = useMemo(
    () => ({
      fullName: currentUser?.fullName || 'Abees Oluwaseun',
      email: currentUser?.email || 'admin@gmail.com',
      phoneNumber: currentUser?.phoneNumber || '0332414089',
      address: currentUser?.address || 'Quang Trung address',
      country: currentUser?.country || 'VietNam',
      region: currentUser?.region || 'VietNam',
      city: currentUser?.city || 'HoChiMinh',
      zipCode: currentUser?.zipCode || '1000',
      imageUrl: currentUser?.imageUrl || '',
      company: currentUser?.company || 'Minimal',
      role: currentUser?.role || 'Admin',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async (data) => {
    try {
      if (!isEdit) {
        const res = await axios.post('api/user/create', data);
        onSuccess(res.user);
        console.log(res);
      } else {
        const formData = new FormData();
        formData.append('fullName', data.fullName);
        formData.append('email', data.email);
        formData.append('phoneNumber', data.phoneNumber);
        formData.append('address', data.address);
        formData.append('country', data.country);
        formData.append('region', data.region);
        formData.append('city', data.city);
        formData.append('zipCode', data.zipCode);
        formData.append('company', data.company);
        formData.append('role', data.role);
        formData.append('imageUrl', data.imageUrl);
        console.log(data.imageUrl);

        const id = currentUser?._id;

        const res = await axios.post('api/user/update', formData, {
          params: {
            id,
          },
        });
        onSuccess(res.user, id);
      }
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
    } catch (error) {
      console.error(error);
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

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
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
              <RHFTextField name="fullName" label="Full Name" />
              <RHFTextField name="email" label="Email Address" disabled={isEdit} />
              <RHFTextField name="phoneNumber" label="Phone Number" />

              <RHFSelect name="country" label="Country" placeholder="Country">
                <option value="" />
                {[].map((option) => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField name="region" label="State/Region" />
              <RHFTextField name="city" label="City" />
              <RHFTextField name="address" label="Address" />
              <RHFTextField name="zipCode" label="Zip/Code" />
              <RHFTextField name="company" label="Company" />
              <RHFTextField name="role" label="Role" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create User' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

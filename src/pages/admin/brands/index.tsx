import { useEffect, useState } from 'react';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import DataTable from '@/components/data-table';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
  useDeleteBrandMutation,
  useGetBrandsQuery,
} from '@/store/brand';
import { getImageFromURL } from '@/components/imageUploader';
import Image from 'next/image';
import CircularProgress from '@mui/material/CircularProgress';

const BrandsPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState({
    page: 0,
    limit: 5,
  });

  const { data } = useGetBrandsQuery<any>(query);
  const [deleteBrand] = useDeleteBrandMutation();
  const [imageSources, setImageSources] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    if (data?.results) {
      const fetchImageSources = async () => {
        const sources: { [key: string]: string } = {}; // Explicitly define the type here
        for (const row of data.results) {
          const imageUrl = row.logo;
          if (imageUrl && !imageSources[imageUrl]) {
            try {
              const source = await getImageFromURL(imageUrl);
              if (source) {
                sources[imageUrl] = source;
              }
            } catch (error) {
              console.error('Error fetching image:', error);
            }
          }
        }
        setImageSources((prevSources) => ({
          ...prevSources,
          ...sources,
        }));
      };
      fetchImageSources();
    }
  }, [data?.results]);

  console.log('data for the reult', data);

  const columns = [
    {
      field: 'name',
      headerName: 'name',
      renderCell: (params: any) => {
        return params.row.name;
      },
    },
    {
      field: 'alias',
      headerName: 'Alias',
      renderCell: (params: any) => {
        return params.row.alias;
      },
    },
    {
      field: 'caveat',
      headerName: 'Caveat',
      renderCell: (params: any) => {
        return params.row.caveat ? 'true' : 'false';
      },
    },
    {
      field: 'logo',
      headerName: 'Logo',
      renderCell: (params: any) => {
        const imageUrl = params.row.logo;
        const source = imageSources[imageUrl];
        if (source) {
          return (
            <Image src={source} alt="Logo" width={50} height={50} />
          );
        } else {
          return <CircularProgress />; // or any other placeholder while loading
        }
      },
    },
  ];

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack direction="row" spacing={1}>
            <Typography variant="h4">Brands</Typography>
            <NextLink href="/admin/brands/add">
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
                size="small"
              >
                Add
              </Button>
            </NextLink>
          </Stack>
          {/* // TODO: Fetch tolat row count */}
          <DataTable
            rows={data?.results}
            rowCount={data?.totalResults}
            columns={columns}
            query={query}
            setQuery={setQuery}
            lastVisible={data?.lastVisible}
            onEdit={(id: any) => {
              router.replace(`/admin/brands/${id}`);
            }}
            onDelete={(id: any) => {
              deleteBrand(id);
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
};

BrandsPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default BrandsPage;

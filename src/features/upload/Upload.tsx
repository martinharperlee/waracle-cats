import React, { useCallback, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Grid from '../grid/Grid';
import { FaCloudUploadAlt, FaSkull, FaCat } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';
import './Upload.scss';
import { selectStatus, setStatus, uploadCat } from './upload.slice';
import { Status } from '../../types/status.type';
import { UploadStatusMessages, Statuses } from '../../enums/status';
import classList from '../../utils/classList';
import { useNavigate } from 'react-router-dom';

export const Upload: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const status: Status = useAppSelector(selectStatus);

    const onSuccess = useCallback(() => {
        dispatch(setStatus(Statuses.INITIAL));
        navigate('/');
    }, [dispatch, navigate]);

    const onError = useCallback(
        () =>
            setTimeout(() => {
                dispatch(setStatus(Statuses.INITIAL));
            }, 3000),
        [dispatch]
    );

    useEffect(() => {
        status === Statuses.SUCCESS && onSuccess();
        status === Statuses.ERROR && onError();
    }, [status, navigate, onSuccess, onError]);

    const statusIcons = {
        [Statuses.INITIAL]: FaCloudUploadAlt,
        [Statuses.SUCCESS]: FaCat,
        [Statuses.ERROR]: FaSkull,
        [Statuses.LOADING]: FaCat,
    };

    const onDrop = useCallback(
        (acceptedFiles) => {
            acceptedFiles.forEach((acceptedFile: File) => {
                dispatch(uploadCat(acceptedFile));
            });
        },
        [dispatch]
    );

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const statusStyle = classList({
        upload: true,
        [`upload--${status.toLowerCase()}`]: true,
    });

    return (
        <Grid>
            <div className={statusStyle} {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="upload__content">
                    {React.createElement(statusIcons[status], {
                        className: 'upload__icon',
                    })}
                    <p className="upload__instructions">
                        {UploadStatusMessages[status]}
                    </p>
                </div>
            </div>
        </Grid>
    );
};

export default Upload;

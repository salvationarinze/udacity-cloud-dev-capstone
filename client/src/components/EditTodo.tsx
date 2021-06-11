import * as React from 'react'
import {Form, Button, Input} from 'semantic-ui-react'
import Auth from '../auth/Auth'
import { patchTodo } from '../api/todos-api'
import { getUploadUrl, uploadFile } from '../api/todos-api'

// import { patchTodo } from '../api/todos-api'
// import construct = Reflect.construct;
import { Todo } from '../types/Todo'

enum UploadState {
  NoUpload,
  FetchingPresignedUrl,
  UploadingFile,
}

interface EditTodoProps {
  match: {
    params: {
      todoId: string
    }
  }
  auth: Auth
}

interface EditTodoState {
  file: any
  uploadState: UploadState
  name: any,
  id: string
}

export class EditTodo extends React.PureComponent<
  EditTodoProps,
  EditTodoState
> {


  // state: EditTodoState = {
  //   file: undefined,
  //   uploadState: UploadState.NoUpload,
  //   name: ''
  // }

  constructor(props: any) {
    super(props);
    console.log(props.location.state.name)
    this.state = {
      file: undefined,
      uploadState: UploadState.NoUpload,
      name: props.location.state.name,
      id: props.location.state.todoId
    }
  }

  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    this.setState({
      file: files[0]
    })
  }

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      await patchTodo(
        this.props.auth.getIdToken(),
        this.state.id,
        {
          name: this.state.name,
          dueDate: new Date().toISOString(),
          done: false
        })
      // if (!this.state.file) {
      //   alert('File should be selected')
      //   return
      // }
      //
      // this.setUploadState(UploadState.FetchingPresignedUrl)
      // const uploadUrl = await getUploadUrl(this.props.auth.getIdToken(), this.props.match.params.todoId)
      //
      // this.setUploadState(UploadState.UploadingFile)
      // await uploadFile(uploadUrl, this.state.file)

      alert('Updated successfully')
    } catch (e) {
      alert('Could not update diary: ' + e.message)
    } finally {
      // this.setUploadState(UploadState.NoUpload)
      console.log("finally")
    }
  }

  setUploadState(uploadState: UploadState) {
    this.setState({
      uploadState
    })
  }

  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({...this.state, name: event.target.value })
    // console.log(event.target.value)
  }

  render() {
    return (
      <div>
        <h1>Update entry </h1>

        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Entry</label>
            <Input
              fluid
              value={this.state.name}
              onChange={this.handleNameChange}
            />
            {/*<input*/}
            {/*  type="file"*/}
            {/*  // accept="image/*"*/}
            {/*  placeholder="Image to upload"*/}
            {/*  onChange={this.handleFileChange}*/}
            {/*/>*/}
          </Form.Field>

          {this.renderButton()}
        </Form>
      </div>
    )
  }

  renderButton() {

    return (
      <div>
        {/*{this.state.uploadState === UploadState.FetchingPresignedUrl && <p>Uploading image metadata</p>}*/}
        {/*{this.state.uploadState === UploadState.UploadingFile && <p>Uploading file</p>}*/}
        <Button
          // loading={this.state.uploadState !== UploadState.NoUpload}
          type="submit"
        >
          Update
        </Button>
      </div>
    )
  }
}

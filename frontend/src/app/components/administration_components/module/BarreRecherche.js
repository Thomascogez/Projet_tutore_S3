import React from 'react';
import { FaSearch } from "react-icons/fa";
import {
    Button,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    FormInput
} from "shards-react"

export default function BarreRecherche()
{
    return(
        <div>
            <InputGroup seamless>
                <InputGroupAddon type="append">                  
                    <InputGroupText>
                        <FormInput placeholder="Recherche module ..."/>  
                        <Button ><FaSearch /></Button>
                    </InputGroupText>
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}